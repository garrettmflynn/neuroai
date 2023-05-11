import { generateNormalLatentVector } from './utils.js'

let session;
export async function load(model = './model.onnx') {
    session = await ort.InferenceSession.create(model);
}


export async function run() {
    const inputTensor = new ort.Tensor('float32', generateNormalLatentVector(128), [1, 128]);
    const inputData = { latent: inputTensor };
    const outputData = await session.run(inputData);
    return outputData.img; // Return the output tensor
}

export async function generateImage() {
    try {
        const outputTensor = await run();
        const [batchSize, channels, height, width] = outputTensor.dims;
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);

        // Ensure canvas is sized correctly (hug pixels)
        canvas.width = width
        canvas.height = height

        // Assuming output tensor is in the format [1, C, H, W]
        for (let h = 0; h < height; h++) {
            for (let w = 0; w < width; w++) {
                for (let c = 0; c < channels; c++) {
                    const value = ((outputTensor.data[c * height * width + h * width + w] + 1) * 0.5) * 255;
                    imageData.data[(h * width + w) * 4 + c] = value;
                }
                imageData.data[(h * width + w) * 4 + 3] = 255; // Set alpha channel to 255 (opaque)
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL()
    } catch (err) {
        console.error('Failed to run model:', err);
    }
}

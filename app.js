// app.js
let model;
let modelTrained = false;

async function initializeTensorFlow() {
    try {
        await tf.setBackend('webgl');
        console.log('Using WebGL backend');
    } catch (e) {
        console.warn('WebGL not supported, falling back to CPU', e);
        await tf.setBackend('cpu');
        console.log('Using CPU backend');
    }
}


// Define the module
const createModel = () => {
    const model = tf.sequential();

    model.add(tf.layers.dense({ inputShape: [2], units: 4, activation: 'sigmoid' }));
    model.add(tf.layers.dense({ units: 4, activation: 'sigmoid' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
        optimizer: tf.train.adam(0.1), // Changed to Adam optimizer
        loss: 'binaryCrossentropy', // Changed loss function
    });

    return model;
};

// Initialize the model

// XOR dataset
const inputs = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]);

const labels = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
]);

let chart;
const trainModel = async () => {
    const progressDiv = document.getElementById('training-progress');
    progressDiv.innerHTML = 'Training: 0%';

    const lossValues = [];
    await model.fit(inputs, labels, {
        epochs: 1000,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                const progress = ((epoch + 1) / 1000 * 100).toFixed(1);
                progressDiv.innerHTML = `Training: ${progress}%`;
                lossValues.push(logs.loss);
                updateLossChart(lossValues);
            },
        },
    });

    console.log('Training complete!');
    progressDiv.innerHTML = 'Training complete!';
    modelTrained = true;
    visualizeDecisionBoundary();
};

const predict = (input) => {
    if (!model) {
        console.error('Model not initialized');
        return null;
    }
    const prediction = model.predict(tf.tensor2d([input]));
    return prediction.dataSync()[0];
};

const visualizeDecisionBoundary = () => {
    console.log('Entering visualizeDecisionBoundary');
    if (!modelTrained) {
        console.error('Model not trained yet');
        return;
    }

    const canvas = document.getElementById('decision-boundary');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    console.log('Canvas found:', canvas);

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    console.log(`Canvas dimensions: ${width}x${height}`);

    const imageData = ctx.createImageData(width, height);

    console.log('Starting to generate decision boundary...');
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const xNorm = x / width;
            const yNorm = y / height;
            const prediction = predict([xNorm, yNorm]);
            if (x === 0 && y === 0) {
                console.log(`Sample prediction for [0, 0]: ${prediction}`);
            }
            const index = (y * width + x) * 4;
            const color = Math.floor(prediction * 255);
            imageData.data[index] = 255 - color;
            imageData.data[index + 1] = color;
            imageData.data[index + 2] = 255; // Black background color (no transparency)
            imageData.data[index + 3] = 255; // Alpha transparency (fully opaque)
        }
    }
    console.log('Finished generating decision boundary');

    ctx.putImageData(imageData, 0, 0);
    console.log('Decision boundary drawn to canvas');
};


const updateLossChart = (lossValues) => {
    if (!chart) {
        const ctx = document.getElementById('loss-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lossValues.map((_, index) => index + 1),
                datasets: [{
                    label: 'Loss',
                    data: lossValues,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        chart.data.labels = lossValues.map((_, index) => index + 1);
        chart.data.datasets[0].data = lossValues;
        chart.update();
    }
};

// Modify the train button event listener
document.getElementById('train-btn').addEventListener('click', async () => {
    await initializeTensorFlow(); // Initialize TensorFlow.js
    model = createModel();
    console.log('Model created:', model);
    modelTrained = false;
    await trainModel();
    modelTrained = true;
    visualizeDecisionBoundary();
});


document.getElementById('predict-btn').addEventListener('click', () => {
    if (!modelTrained) {
        alert('Please train the model first!');
        return;
    }
    const x = parseFloat(document.getElementById('input-x').value);
    const y = parseFloat(document.getElementById('input-y').value);
    if (isNaN(x) || isNaN(y)) {
        alert('Please enter valid numbers for X and Y');
        return;
    }
    const prediction = predict([x, y]);
    document.getElementById('output').innerText = `Prediction: ${prediction.toFixed(3)}`;
});

const updatePrediction = () => {
    if (modelTrained) {
        const x = parseFloat(document.getElementById('input-x').value);
        const y = parseFloat(document.getElementById('input-y').value);
        if (!isNaN(x) && !isNaN(y)) {
            const prediction = predict([x, y]);
            document.getElementById('output').innerText = `Prediction: ${prediction.toFixed(3)}`;
        }
    }
};

document.getElementById('input-x').addEventListener('input', updatePrediction);
document.getElementById('input-y').addEventListener('input', updatePrediction);
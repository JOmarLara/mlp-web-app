// app.js
let model;
let modelTrained = false;

// Define the module
const createModel = () => {
    const model = tf.sequential();

    // Input layer (2 inputs)
    model.add(tf.layers.dense({ inputShape: [2], units: 4, activation: 'sigmoid' }));

    // Hidden layer
    model.add(tf.layers.dense({ units: 4, activation: 'sigmoid' }));


    // Output layer (1 output)
    model.add(tf.layers.dense({ units:1, activation: 'sigmoid' }));

    // Compile the model
    model.compile({
        optimizer: tf.train.sgd(0.1), // Stochastic Gradient Descent
        loss: 'meanSquaredError', // Loss function
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
};

const predict = (input) => {
    if (!model) {
        console.error('Model not initialized');
        return null;
    }
    const prediction = model.predict(tf.tensor2d([input]));
    return prediction.dataSync()[0];
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
    model = createModel();
    console.log('Model created:', model);
    modelTrained = false;
    await trainModel();
    modelTrained = true;
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
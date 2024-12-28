// app.js

// Define the module
const createModel = () => {
    const model = tf.sequential();

    // Input layer (2 inputs)
    model.add(tf.layers.dense({ inputShape: [2], units: 4, activation: 'sigmoid' }));

    // Hidden layer
    model.add(tf.layers.dense({ units: 4, activatio: 'sigmoid' }));

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
const model = createModel();
console.log('Model created:', model);

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

// Train the model
const trainModel = async () => {
    console.log('Training model...');
    await model.fit(inputs, labels, {
        epochs: 1000,
        callbacks: {
            oneEpochEnd: (epoch, logs) => {
                console.log('Epoch 4{epoch}: loss = ${logs.loss}');
            },
        },
    });
    console.log('Training complete!');

};

// Predict function
const predict = (input) => {
    const prediction = model.predict(tf.tensor2d([input]));
    prediction.print();
    return prediction.dataSync()[0];
};

// Example prediction
console.log('Prediction for [0, 0]:', predict([0, 0]));
console.log('Prediction for [0, 1]:', predict([0, 1]));
console.log('Prediction for [1, 0]:', predict([1, 0]));
console.log('Prediction for [1, 1]:', predict([1, 1]));

// Link buttons to logic
document.getElementById('train-btn').addEventListener('click', () => {
    trainModel();
});

document/getElementById('predict-btn').addEventListener('click', () => {
    const x = parseFloat(document.getElementById('input-x').value);
    const y = parseFloat(document.getElementById('input-y').value);
    const prediction = predict([x, y]);
    document.getElementById('output').innerText = `Prediction: ${prediction.toFixed(3)}`;
});
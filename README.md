### **README: MLP XOR Neural Network Web App**

---

## **Project Overview**

This project implements a **Multilayer Perceptron (MLP)** to solve the **XOR problem**, a classic benchmark in neural network research. It demonstrates the ability of an MLP to learn non-linear patterns through the implementation of hidden layers. The project is built using **TensorFlow.js** and runs entirely in the browser, making it accessible, interactive, and efficient.

This project showcases my expertise in:
1. Neural network architecture and implementation.
2. Mathematical modeling and optimization.
3. Modern web technologies for machine learning applications.
4. End-to-end deployment of AI solutions.

---

## **Features**

- **Interactive Training**: Users can train the model in real time in their web browser.
- **Real-Time Predictions**: Test the trained model by providing inputs to observe the XOR output.
- **Browser-Based Framework**: No installation required; the app runs natively in any modern browser.
- **Clean User Interface**: Designed with HTML and CSS for usability and aesthetics.

---

## **Technical Breakdown**

### **The XOR Problem**
The XOR (exclusive OR) function is defined as:

- Output is `1` if exactly one of the two inputs is `1`.
- Output is `0` if both inputs are the same.

| Input 1 | Input 2 | XOR Output |
|---------|---------|------------|
|    0    |    0    |     0      |
|    0    |    1    |     1      |
|    1    |    0    |     1      |
|    1    |    1    |     0      |

The XOR problem is non-linearly separable, meaning a single-layer perceptron cannot solve it. An MLP introduces hidden layers that map the inputs into a higher-dimensional space where linear separation is possible.

---

### **Model Architecture**
1. **Input Layer**: Two nodes for the two inputs.
2. **Hidden Layer**: Four nodes with a sigmoid activation function.
3. **Output Layer**: A single node with a sigmoid activation for binary classification.

**Forward Pass**:
- Compute weighted sums at each layer and apply activation functions.

**Backpropagation**:
- Compute errors at the output layer and propagate them backward.
- Update weights using gradient descent to minimize the loss.

### **Loss Function**
The Mean Squared Error (MSE) is used to evaluate the performance:
```
Loss = (1/n) * Σ (y_pred - y_true)^2
```
Where:
- `y_pred` is the predicted output.
- `y_true` is the actual output.

### **Optimization**
Weights are updated using Stochastic Gradient Descent (SGD):
```
Weight_new = Weight_old - (learning_rate * gradient)
```

---

## **Technology Stack**

- **TensorFlow.js**: For defining, training, and evaluating the neural network.
- **HTML/CSS**: For creating the user interface.
- **JavaScript**: For integrating TensorFlow.js and managing user interactions.

---

## **How It Works**

### **Training**
1. Click the "Train Model" button.
2. The MLP is trained on the XOR dataset.
3. Training logs, including loss per epoch, are displayed in the console.

### **Testing**
1. Enter two inputs (0 or 1).
2. Click "Predict" to see the model's output in real time.

---

## **Installation and Usage**

### **Local Setup**
1. Clone this repository:
   ```bash
   git clone https://github.com/JOmarLara/mlp-web-app.git
   ```
2. Navigate to the project directory and open `index.html` in a web browser.

### **Live Demo**
Check out the live deployment on **GitHub Pages**: [Demo Link](https://jomarlara.github.io/mlp-web-app/).

---

## **Future Enhancements**
- Add visualization of the decision boundary.
- Extend the interface to support custom datasets.
- Display performance metrics such as accuracy and confusion matrices.
- Enable model export/import functionality.

---

## **Why This Project Matters**

This project demonstrates:
- The ability to implement and train a neural network to solve a fundamental problem in AI.
- Proficiency in TensorFlow.js and web development technologies.
- A practical understanding of the interplay between theoretical mathematics and real-world applications.

By building this project, I aim to highlight my capability to bridge the gap between technical complexity and user-friendly AI solutions.

---

## **Contact**
Feel free to reach out for collaboration or inquiries:
- **Email**: [your.email@example.com](mailto:alaraom93@gmail.com)
- **LinkedIn**: [Your LinkedIn Profile](www.linkedin.com/in/jesus-omar-lara)

---
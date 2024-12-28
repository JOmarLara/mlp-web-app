# mlp-web-app

### **README: MLP XOR Neural Network Web App**

---

## **Project Overview**

This project implements a **Multilayer Perceptron (MLP)** to solve the classic **XOR problem**—a benchmark in artificial intelligence and neural network theory. The app is built using **TensorFlow.js**, allowing users to train and test the model directly in their web browser. 

The XOR problem is linearly non-separable, requiring a hidden layer to map inputs into a space where linear decision boundaries are possible. This project demonstrates foundational concepts of neural networks and provides a robust, interactive platform for visualizing the learning process of an MLP in real time.

This project reflects my expertise in:
1. Neural network architecture and optimization.
2. Mathematical formulation of deep learning problems.
3. JavaScript-based machine learning frameworks.
4. Deploying interactive web-based AI solutions.

---

## **Features**

- **Fully Functional MLP**: A neural network with one hidden layer implemented in TensorFlow.js.
- **Browser-Based Training**: Users can train the model in their browser without needing external servers.
- **Real-Time Predictions**: Users can input values and instantly observe predictions.
- **XOR Dataset**: Demonstrates the ability of MLPs to learn non-linear patterns.
- **Interactive UI**: Clean and user-friendly interface built with HTML and CSS.

---

## **Mathematical Foundations**

### **Problem Statement: XOR Logic**
The XOR problem is defined as:
\[
\text{XOR}(x_1, x_2) = \begin{cases} 
0 & \text{if } x_1 = x_2 \\
1 & \text{if } x_1 \neq x_2 
\end{cases}
\]
The input space \([x_1, x_2]\) is linearly inseparable, necessitating a model with non-linear capabilities.

### **MLP Architecture**
The MLP architecture used in this project consists of:
1. **Input Layer**: Two input nodes \((x_1, x_2)\).
2. **Hidden Layer**: Four nodes with a sigmoid activation function to introduce non-linearity.
3. **Output Layer**: A single node with a sigmoid activation for binary classification.

Mathematically, the forward pass is:
\[
z^{(1)} = W^{(1)}x + b^{(1)}, \quad a^{(1)} = \sigma(z^{(1)})
\]
\[
z^{(2)} = W^{(2)}a^{(1)} + b^{(2)}, \quad \hat{y} = \sigma(z^{(2)})
\]
Where:
- \( W^{(1)} \) and \( W^{(2)} \) are weight matrices for the hidden and output layers.
- \( b^{(1)} \) and \( b^{(2)} \) are bias vectors.
- \( \sigma(x) = \frac{1}{1 + e^{-x}} \) is the sigmoid activation function.

---

### **Loss Function**
The model minimizes the **Mean Squared Error (MSE)**:
\[
\mathcal{L} = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2
\]

---

### **Optimization**
The weights are updated using **Stochastic Gradient Descent (SGD)**:
\[
W \leftarrow W - \eta \frac{\partial \mathcal{L}}{\partial W}
\]
Where:
- \( \eta \) is the learning rate.

The partial derivatives are computed using backpropagation:
\[
\delta^{(2)} = (\hat{y} - y) \cdot \sigma'(z^{(2)})
\]
\[
\delta^{(1)} = (\delta^{(2)} W^{(2)}) \cdot \sigma'(z^{(1)})
\]

---

## **Technology Stack**

- **TensorFlow.js**: For implementing and training the neural network.
- **HTML/CSS**: For creating a clean and responsive user interface.
- **JavaScript**: For integrating TensorFlow.js and handling UI interactions.

---

## **How It Works**

### **Training**
1. Users click the "Train Model" button.
2. The MLP is trained on the XOR dataset using the backpropagation algorithm.
3. Training progress, including loss at each epoch, is logged to the console.

### **Testing**
1. Users input \( x_1 \) and \( x_2 \).
2. The trained model predicts the XOR output.
3. The result is displayed in real time.

---

## **Installation and Deployment**

### **Local Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/JOmarLara/mlp-web-app.git
   ```
2. Open `index.html` in a web browser.

### **Live Deployment**
This app is deployed using **GitHub Pages**. Access it [here](#).

---

## **Future Improvements**
1. Add support for visualizing the decision boundary.
2. Enable saving and loading trained models.
3. Extend to multi-class classification problems.
4. Provide detailed performance metrics like accuracy and confusion matrices.

---

## **Why This Project Matters**

This project showcases my ability to:
- Understand and implement advanced machine learning models.
- Translate mathematical concepts into functional code.
- Build interactive, browser-based applications using modern frameworks.

The XOR problem is foundational in AI, demonstrating how neural networks overcome linear separability challenges. This project is designed to highlight core machine learning principles while being an engaging, real-world application.

---

## **Contact**
For inquiries or collaboration, feel free to reach out at **[your.email@example.com](mailto:alaraom93@gmail.com)** or connect with me on **[LinkedIn](www.linkedin.com/in/jesus-omar-lara)**. 

---

## **Acknowledgments**
Inspired by foundational works in neural networks and the advancements in browser-based AI frameworks.

---
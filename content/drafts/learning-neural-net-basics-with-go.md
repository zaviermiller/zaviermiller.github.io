---

title: Building My First NN in Go

created: 01-03-21

category: ML

---
So this is my first technical post on my website, and I think I want to treat the journal as, well, a *journal* of the process as I do whatever is in the post title. Basically, I'm not going to put every piece of code I write, but rather the bits I feel I should share with a general tech audience. With that said, today I'm building a pretty simple MLP with backpropogation to make sure I at least understand the most basic concepts of Neural Networks before abstracting it all away.

One more quick note before I get into it, I will have the sources I used to help me build this specific Go MLP, but if you happen to also be trying to self-teach yourself the basics before your courses, I'd recommend following the [MIT Intro to Deep Learning YouTube playlist](https://youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI). I'm currently on video #3 trying to wrap my head around the increasingly complex matrix algebra (and I'm barely stuck into it!), but the videos are really good :]

## Building the Neural Network
In order to build the network, I used the `gonum.org/v1/gonum/mat` package so that at least the matrices were  abstracted away.

The first step, from [this blog post](https://datadan.io/blog/neural-net-with-go), was pretty simple, I just had to build a `NeuralNetwork` struct to represent the overall network fields, which also held a config struct with some **configurable** network parameters. The code can be found in the blog post, as I pretty much ~~copied~~ followed it closely.

After finishing that, I moved on to building some helper activation functions that would be used between the layors of the perceptron. The blog post only shows how to build a sigmoid function, so I guess I can show off my sick blog code preview
```go
// zml/zmlp/activations.go

// (Rectified Linear Units) returns 0 if negative, or the number
func ReLU(num float64) float64 {
	return math.Max(0.0, num)
}

// derivative of ReLU for backprop
func ReLUPrime(num float64) float64 {
	if num < 0.0 {
		return 0.0
	}
	return 1.0
}
```

And that's all! It's super simple, but supposedly it adds an element of nonlinearity to the data when there are negative numbers which is nice.

The next step on the blog is to actually build the training and backpropagation function. I was doing this when I realized I didn't know what the format of the input I had was going to be, so I spent a little time researching the MNIST data set, and trying to find a Go parser. I eventually came across this [Github Gist](https://gist.github.com/higuma/dbcd006546eb844c01e5102b4d0bcc93), which is actually super cool and works right out the box. It's even able to print the numbers in the terminal which is sick. More importantly, it outputs the dimensions of the image, number of items, and all the images represented as a 2D uint8 slice with the correct label output. Perfect!

After building the `Train` func, and all the very long helper functions, the final step is to build a `Predict` func to take in the inputs and output the predicted value based on the trained model. Comparatively, this function is very easy, which is nice.

...

Well, I finished building it all and unfortunately, it doesn't work. So, I am using a [new blog post](https://sausheong.github.io/posts/how-to-build-a-simple-artificial-neural-network-with-go/) to try and build it a little better, and maybe with a little more customization and deep learning capabilities. This blog post has a lot more info on whats going on, so it's also a better learning resource.

After a changing it all out, and a little debugging, I was finally able to get the basic network working! With the current setup, I can get about 94.5% accuracy on the testing data, but I want to be able to get that as high as I can. I have a few ideas on how to improve the current network design, and then a couple on how to convert the current model into a deep neural net.

## Testing and Improving the Model
In order to try and improve the model a bit, I figured adding in the code to add in the bias for each layer would help improve the network at least slightly. However, after implementing them into the model I found that the accuracy actually decreased to about 92%. Oh wait, while typing this out I realized I didn't implement the model into the prediction lmao...[
Ok! The first step, **correctly** implementing the bias into the network, actually did end up improving the network! By .4%. Not too much, but an improvement nonetheless! I have one more idea, which is to make the activation of each neuron the ReLU function that I wrote earlier rather than the Sigmoid function. After writing and implementing this, the model actually decreased in accurary to about 90%. Unfortunately, that's all I think I can tackle at the moment. There are more techniques to improve my basic MLP, like mini-batching, but I need to do more research before I try and take that on.
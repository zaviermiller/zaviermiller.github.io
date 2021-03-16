---

title: Building My First NN in Go

created: 02-03-21
date: February 3, 2021

category: ML

---
So this is my first technical post on my website, and I think I want to treat the journal as, well, a *journal* of the process as I do whatever is in the post title. Basically, I'm not going to put every piece of code I write, but rather the bits I feel I should share with a general tech audience. With that said, today I'm building a pretty simple MLP with backpropogation to make sure I at least understand the most basic concepts of Neural Networks before abstracting it all away.

One more quick note before I get into it, I will have the sources I used to help me build this specific Go MLP, but if you happen to also be trying to self-teach yourself the basics before your courses, I'd recommend following the [MIT Intro to Deep Learning YouTube playlist](https://youtube.com/playlist?list=PLtBw6njQRU-rwp5__7C0oIVt26ZgjG9NI). I'm currently on video #3 trying to wrap my head around the increasingly complex matrix algebra (and I'm barely stuck into it!), but the videos are really good :]

## Building the Neural Network
In order to build the network, I used the `gonum.org/v1/gonum/mat` package so that at least the matrices were  abstracted away.

The first step, from [this blog post](https://datadan.io/blog/neural-net-with-go), was pretty simple: I just had to build a `NeuralNetwork` struct to represent the overall network fields, which also held a config struct with some *configurable* network parameters. The code can be found in the blog post, as I pretty much ~~copied~~ followed it closely.

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

## An Unfortunate Update
Well, here I am exactly a month after I intended on posting this blog post. Over winter break I spent a lot of time building my framework up and making it clean Go code (I'm pretty proud of the structure I think it's nice). I was able to finish the basic MLP as well as a Deep Network that could have a configurable number of layers. Pretty sick. Then, I started *trying* to optimize... At some point in the process, my limited understanding of matrix algebra took precedence over my desire to build my framework up. I will probably come back and update it over the year, but I gotta learn a lil sum bout sum before I go much further. Thanks for reading this far! Here is the [project repo](https://github.com/zaviermiller/zml).
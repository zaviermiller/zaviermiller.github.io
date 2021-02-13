---
title: Speedrunning an Extra-Credit CS Lab

created: 02-12-21

category: school
---

Every Friday, our Computer Organization professor publishes a new lab which is meant to be done during the following week; however, next week we have our first exam and our professor made the lab for the week optional. So, this morning I checked the Canvas page to read info about the newly published lab when I noticed this lil' message at the bottom of the page.

<!-- <z-img src="/extra credit.png" alt="Image with text: Students who submit their final submission early will receive extra points given by the following table. The table is only relevant if the student submits a complete, working solution. Final submission by: 12-Feb: +10, 13-Feb: +8, 14-Feb: +5, 15-Feb: +3, 16-Feb: +1" center class="mt-4" ></z-img> -->

> Students who submit their final submission early will receive extra points given by the following table. The table is only relevant if the student submits a complete, working solution.
>
> Final submission by:
>
> 12-Feb: +10
> 13-Feb: +8
> 14-Feb: +5
> 15-Feb: +3
> 16-Feb: +1

Now, I am still not entirely sure what this means for the lab overall, but I'm thinking this lab is optional for extra credit AND you can get extra _extra_ credit for doing it early (with the max for doing it in a day). Hell yeah, thank God I took my Adderall late today. Challenge accepted, let's get it.

Also, a quick note before I get too deep into it: I can't share any code because I am pretty sure that is cheating (which would make me fail), but I will be explaining how I go about implementing the algorithms for the lab.

## Floating Point Arithmetic

So what is this lab about? Well, last week our assignment was to build binary arithmetic operations in C++ using ints, so naturally, this lab has us building binary `Add` and `Multiply` methods for [IEEE-754 floats](https://en.wikipedia.org/wiki/IEEE_754). This assignment seems like it's going to be pretty tricky because the 32 bits in a float are partitioned, and not representative of an actual number in binary. Because of this partitioning, another part of our assignment is to build an `Encode` and `Decode` function for the floats to go to and from an int. The last function I have is called `Normalize` which I will come back to and explain later. First things first, I need to build an encoder and decoder.

## Encoder and Decoder

For the lab, we were given a template with the following struct to represent a parsed float:

```cpp
struct Real {
  //sign bit
  int sign;
  //UNBIASED exponent
  long exponent;
  //Fraction including implied 1. at bit index 23
  unsigned long fraction;
};
```

So to `Decode` a number into this struct, I need to separate the first bit into `sign`, the next 8 bits into `exponent`, and the final 23 into `fraction`. This is simple enough, all I have to do (in theory) is shift the bits over and combine them with a [mask](<https://en.wikipedia.org/wiki/Mask_(computing)#:~:text=In%20computer%20science%2C%20a%20mask,in%20a%20single%20bitwise%20operation.>) so I only get the bits I want. For example, `0xff` was the mask we were told to use for the exponents. I'm going to figure out the other masks and _hopefully_ very quickly finish this decoder. On top of this, I have to set the 23rd bit of the fraction variable which is where an implied `1.` sits in a float. In order to operate on the float, it has to actually have this implied `1.` or the math won't work out.

Nice, I got it working! It's a little tough to confirm though, but I managed to compare my 3 components to a website online after giving the same hex number (`0x40f33333`) to each. Now that the decoder works, I need to build the `Encode`. This one is even simpler than the decoder because all I have to do is OR equals an int with all the bits shifted to the correct place. I'm gonna try to make it a one-liner ;)

Hell yeah baby, got it in one line! A quick note if you're coding along with me at home, make sure to mask the exponent and fraction bits before encoding, since after doing operations there may be some extra bits that you don't want to overflow. Again this one was a little tough to test, but what I did was convert a float to binary, then convert the binary to an int. Then, I decoded and encoded it and made sure that the int I got out was the same as the one I put in.

Well sweet. 2/5 things done, but now I gotta do the hard stuff.

### Quick Fix

Hello, future Zavier here coming back to the middle of the blog post to ensure I talk about the [exponent bias](https://en.wikipedia.org/wiki/Exponent_bias), which I nearly missed. Basically, before decoding you need to subtract a "bias" from the exponent so that we can store negative exponents easily, and vice versa with encoding. There is also another caveat where encoding can result in a negative number even WITH the bias added back in, in which case we are instructed to just clamp the value to zero. Luckily, this doesn't ruin my amazing one-line `Encode` function B)

## Adding

Our wonderful TA has [a guide](http://web.eecs.utk.edu/~cmuncey/cs130/floats.html) on how floating-point arithmetic works, which is what I will be following to implement the `Add` function. This function will probably be one of the harder ones as you can't add numbers of different exponents together, so I first need to find the larger number and convert the smaller one to that exponent. The only way to find the largest number is to manually check each state, so unfortunately there is a big ugly if block in my code that I couldn't avoid. Anyways, after I know which number is bigger, I know the exponent and sign of the result. Nice 2/3 things, now I just need the fraction.

Because we can't add numbers of different exponents, I have to convert the smaller number to the bigger ones exponent. This isn't too hard though, because all I have to do is add the difference in exponents to the smaller exponent and then right shift it by the same amount (I won't get into why but the guide goes way deeper). The next step is to add the two fractions, but if either one is negative, you have to take the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) form so that working with negatives is easy. This is superrr easy because the conversion formula is **dead** simple:

```cpp
int negative = ~(num) + 1;
```

Now we have our result! Unfortunately, we aren't done because the implied `1.` might not be in the correct place, so there's one final step. This is where the `Normalize` function comes in.

### Normalization

On my own for this one, no guides. My algorithm is pretty cool, in my opinion. The basic idea is that while the `1.` is too far to the left, right-shift the fraction and add one to the fraction; the reverse is true for whenever `1.` is too far to the right.

That's basically it! It's a little weird whenever the result is 0, but that's simple enough to fix.

With the addition working (and tested pretty thoroughly), I only have the multiplication function!

## Multiplication

This one is actually easier than addition, which is nice because I'm tired of thinking about floats.

So for this function, the first thing to do is figure out what the sign of the result will be. This is also _super_ simple because the result sign is just the XOR of the two signs.

Next up are the exponents, which are also super easy to do. In multiplying exponents, all you have to do is add them together and that is the product. And that's all, only one more step!

The last thing to do is the fraction part, which, again, is super easy. All we have to do is multiply the two fractions, and then since the float is no longer normalized we have to return the result passed into the `Normalize` function. And I did it! Obviously, I had to do a little debugging, but I explained all the major concepts.

## Conclusion

I almost can't believe it. I mean, the labs aren't super difficult, but usually, I don't finish them in a day. Although, with this lab, I was definitely more motivated to push through the boredom and get that sweet sweet double extra credit. I'm glad I got it done because of that, but also because I can now focus on next week's lab (which is some image manipulation stuff and seems super fun) and study for the exam coming up. Thanks for following along with me, have a nice rest of your day :]

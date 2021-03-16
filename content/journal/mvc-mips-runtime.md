---
title: Learning MVC - An Assembly Runtime in C++

created: 03-15-21
date: March 15, 2021

category: code
---

So, I'm back with another write-up about a lab (I do have drafts for different kinds of journals, I'm just trying to figure out how to properly word them and everything). These are easy and fun to write about, so why not do it again? This week, our task is pretty difficult: we have to build a MIPS assembly interpreter/runtime in C++, with a nice console UI and everything. Due to the scope and scale of the lab, we were given more freedom in how we design and build the lab. After reading all of the information and requirements, I think it' pretty well suited to build using an architecture pattern called [Model View Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). I've had experience with this pattern in the past, Ruby on Rails has it built into its framework, but I've always struggled to understand just how it all *exactly* fits together. 

From what I understand currently, it essentially breaks the code up into three parts: the models, views, and controllers. The models are responsible for manipulating or retrieving data. The view's sole purpose is to display some given parameters in a certain way. Finally, there's the controller. The controller has an instance of the view and model and facilitates communication between the two (this includes taking user input and processing it). Again, at a high level, this concept isn't too hard to grasp; however, when it comes to applying these principles to a simpler app without HTTP requests and the like, it can be a little confusing for me.

## Initial thoughts

Before actually getting stuck into building the thing, I have to figure out how the lab will implement MVC. Basically, the lab has a UI that can either display program information or run a command. I've done quite a bit of reading and Googling to try and figure out how best to apply it, and I think I've come up with a pretty simple implementation that works well for this scope. The plan is to have one class for each part of the pattern. Then, the controller will have a function for taking in input and another for handling it, either rendering a view or committing an action to the model. I've got it drawn up, and I'll go more into detail in the following sections.

## RegisterView

The easiest class to make will be the view since in the MVC pattern the view doesn't know anything about the controller or model (or at least mine doesn't if I'm implementing anything wrong please let me know!!). The lab requires we have two "views", one to display a single register and one to display all the registers and current program counter. I struggled for a little bit on how to actually go about implementing this "different view" or *routing* system, but finally, I decided to just have the `RegisterView` class only have one function: `Render(reg_name, reg_val)`. The controller will then be responsible for showing the view differently in the handler, based on the user input. I think this works pretty well in this case, but I'm not sure if this is the actual way that routing is implemented in MVC frameworks.

Anyway, that's all I had to do to finish that class. Nice! Technically 1/3 done (not really).

## Machine

The `Machine` class was given to us to represent a basic MIPS machine, and in my program is the model class. This part of the assignment is what they actually were testing us on, so I can't go too deep in this section for cheating reasons. Sorry :[ but there's some other stuff I can talk about that doesn't give anything away. For this part, I wanted to make sure I was keeping the model encapsulated and abstracted. I created some private functions that carried out the necessary operations, and then made a simple public API that lets the controller not worry about how the model gets shit done. These public functions were basically just the exact name of the commands, which I think is cool and keeps the controller clean: `Next`, `GetRegister`, etc...

Sweet, so now I'm 2/3 done, but I still have to manually test each view and model function in my main function. If only there were a way to clean this up and control it all from a different class. Oh, wait! There is!

## MachineController

The final class is the controller, which uses composition to keep a pointer to the `Machine` class and an instance of the `RegisterView` class to pull everything together and let the user *control* the app. There are two functions I know I need right off the bat that I talked about earlier: a function to accept input and another to handle it. I have the model and views set up so that in the handler, I just have to do some variant of calling either's public API. This makes it super convenient to use the controller because we don't need to worry about how the data is manipulated or displayed, we just need it to happen.

Easy enough, now I just have to build out the different "views" which are actually just functions that use the `RegisterView.Render` function to produce a new output. And that's it! A super quick example of MVC in a console app; something I've always wanted to do to understand the workings better.

## Conclusion

As I grow as a developer, I am beginning to see and understand the different aspects of good, clean code vs. shitty unmaintainable code. It's difficult, and I still write a lot of shitty code but doing projects like this definitely help me practice proven non-shitty practices.

In learning MVC better to build this project, and just while building and debugging, it's been made apparent where the benefits of MVC lie. When I needed to modify a part of the controller, view, or model, it was super simple and I could make the change without having to worry about fixing anything else. To me, it's always been hard to know what it means to have to "worry about other code" when programming. After this, it's a little more clear; it's hard to describe but it was nice and I look forward to improving and coding like this more often. Thanks for reading yall, again, if I implemented anything incorrectly or you have ideas on how to build your own MVC machine, hit me up!
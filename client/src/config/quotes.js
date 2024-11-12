const quotes = [
  {
    id: 1,
    quote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    id: 2,
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: 3,
    quote: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    id: 4,
    quote:
      "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
  },
  {
    id: 5,
    quote: "The best way to predict the future is to implement it.",
    author: "David Heinemeier Hansson",
  },
  {
    id: 6,
    quote:
      "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
  },
  {
    id: 7,
    quote:
      "Sometimes it's better to leave something alone, to pause, and that's very true of programming.",
    author: "Joyce Wheeler",
  },
  {
    id: 8,
    quote: "Testing leads to failure, and failure leads to understanding.",
    author: "Burt Rutan",
  },
  {
    id: 9,
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    id: 10,
    quote: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
  {
    id: 11,
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    id: 12,
    quote: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin",
  },
  {
    id: 13,
    quote: "It's not a bug – it's an undocumented feature.",
    author: "Anonymous",
  },
  {
    id: 14,
    quote: "Developer: An organism that turns caffeine into code.",
    author: "Anonymous",
  },
  {
    id: 15,
    quote:
      "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    author: "Edsger Dijkstra",
  },
  {
    id: 16,
    quote: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
  },
  {
    id: 17,
    quote:
      "The most damaging phrase in the language is 'We've always done it this way.'",
    author: "Grace Hopper",
  },
  {
    id: 18,
    quote: "Don't comment bad code - rewrite it.",
    author: "Brian Kernighan",
  },
  {
    id: 19,
    quote: "Code never lies, comments sometimes do.",
    author: "Ron Jeffries",
  },
  {
    id: 20,
    quote: "Simple things should be simple, complex things should be possible.",
    author: "Alan Kay",
  },
  {
    id: 21,
    quote:
      "Programming is the art of telling another human what one wants the computer to do.",
    author: "Donald Knuth",
  },
  {
    id: 22,
    quote:
      "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
  },
  {
    id: 23,
    quote: "Software is a great combination of artistry and engineering.",
    author: "Bill Gates",
  },
  {
    id: 24,
    quote: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates",
  },
  {
    id: 25,
    quote:
      "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
    author: "Bill Gates",
  },
  {
    id: 26,
    quote: "Before software can be reusable it first has to be usable.",
    author: "Ralph Johnson",
  },
  {
    id: 27,
    quote: "Good code is its own best documentation.",
    author: "Steve McConnell",
  },
  {
    id: 28,
    quote:
      "The best programmers are not marginally better than merely good ones. They are an order-of-magnitude better.",
    author: "Randall E. Stross",
  },
  {
    id: 29,
    quote:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    id: 30,
    quote:
      "Walking on water and developing software from a specification are easy if both are frozen.",
    author: "Edward V. Berard",
  },
  {
    id: 31,
    quote:
      "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
    author: "Antoine de Saint-Exupery",
  },
  {
    id: 32,
    quote: "Programming is not about typing, it's about thinking.",
    author: "Rich Hickey",
  },
  {
    id: 33,
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    id: 34,
    quote:
      "The great thing about Object Oriented code is that it can make small, simple problems look like large, complex ones.",
    author: "Anonymous",
  },
  {
    id: 35,
    quote:
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
  },
  {
    id: 36,
    quote:
      "Software and cathedrals are much the same – first we build them, then we pray.",
    author: "Sam Redwine",
  },
  {
    id: 37,
    quote: "It's harder to read code than to write it.",
    author: "Joel Spolsky",
  },
  {
    id: 38,
    quote: "The best code is no code at all.",
    author: "Jeff Atwood",
  },
  {
    id: 39,
    quote: "Code is poetry.",
    author: "WordPress",
  },
  {
    id: 40,
    quote: "Debugging is twice as hard as writing the code in the first place.",
    author: "Brian Kernighan",
  },
  {
    id: 41,
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
  },
  {
    id: 42,
    quote: "Software being 'Done' is like lawn being 'Mowed'.",
    author: "Jim Benson",
  },
  {
    id: 43,
    quote: "The sooner you start to code, the longer the program will take.",
    author: "Roy Carlson",
  },
  {
    id: 44,
    quote: "The best way to get a project done faster is to start sooner.",
    author: "Jim Highsmith",
  },
  {
    id: 45,
    quote: "Plan to throw one away; you will, anyhow.",
    author: "Fred Brooks",
  },
  {
    id: 46,
    quote:
      "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    author: "Patrick McKenzie",
  },
  {
    id: 47,
    quote:
      "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.",
    author: "Eagleson's Law",
  },
  {
    id: 48,
    quote: "The only way to go fast is to go well.",
    author: "Robert C. Martin",
  },
  {
    id: 49,
    quote: "Programming is the art of doing one thing at a time.",
    author: "Michael Feathers",
  },
  {
    id: 50,
    quote:
      "No matter how slow you are writing clean code, you will always be slower if you make a mess.",
    author: "Robert C. Martin",
  },
  {
    id: 51,
    quote:
      "The trick is to fix the problem you have, rather than the problem you want.",
    author: "Bram Cohen",
  },
  {
    id: 52,
    quote: "The amateur software engineer is always in search of magic.",
    author: "Grady Booch",
  },
  {
    id: 53,
    quote:
      "Programming can be fun, so can cryptography; however they should not be combined.",
    author: "Kreitzberg and Shneiderman",
  },
  {
    id: 54,
    quote: "Focus is a matter of deciding what things you're not going to do.",
    author: "John Carmack",
  },
  {
    id: 55,
    quote:
      "The purpose of software engineering is to control complexity, not to create it.",
    author: "Pamela Zave",
  },
  {
    id: 56,
    quote: "If you think good architecture is expensive, try bad architecture.",
    author: "Brian Foote",
  },
  {
    id: 57,
    quote:
      "There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies and the other is to make it so complicated that there are no obvious deficiencies.",
    author: "C.A.R. Hoare",
  },
  {
    id: 58,
    quote:
      "A programming language is for thinking about programs, not for expressing programs you've already thought of.",
    author: "Paul Graham",
  },
  {
    id: 59,
    quote:
      "The wonderful thing about standards is that there are so many to choose from.",
    author: "Grace Hopper",
  },
  {
    id: 60,
    quote:
      "Writing the first 90 percent of a computer program takes 90 percent of the time. The remaining ten percent also takes 90 percent of the time.",
    author: "Tom Cargill",
  },
  {
    id: 61,
    quote:
      "Good programmers use their brains, but good guidelines save us having to think out every case.",
    author: "Francis Glassborow",
  },
  {
    id: 62,
    quote:
      "In programming, the hard part isn't solving problems, but deciding what problems to solve.",
    author: "Paul Graham",
  },
  {
    id: 63,
    quote:
      "The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.",
    author: "Tom Cargill",
  },
  {
    id: 64,
    quote:
      "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.",
    author: "Rick Cook",
  },
  {
    id: 65,
    quote: "Good software, like wine, takes time.",
    author: "Joel Spolsky",
  },
  {
    id: 66,
    quote:
      "The best performance improvement is the transition from the nonworking state to the working state.",
    author: "John Ousterhout",
  },
  {
    id: 67,
    quote:
      "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases.",
    author: "Norman Augustine",
  },
  {
    id: 68,
    quote:
      "The most important single aspect of software development is to be clear about what you are trying to build.",
    author: "Bjarne Stroustrup",
  },
  {
    id: 69,
    quote:
      "Without requirements or design, programming is the art of adding bugs to an empty text file.",
    author: "Louis Srygley",
  },
  {
    id: 70,
    quote:
      "The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that.",
    author: "Robert C. Martin",
  },
  {
    id: 71,
    quote: "The best way to predict the future is to implement it.",
    author: "Alan Kay",
  },
  {
    id: 72,
    quote:
      "Programming is breaking of one big impossible task into several very small possible tasks.",
    author: "Jazzwant",
  },
  {
    id: 73,
    quote:
      "Object-oriented programming is an exceptionally bad idea which could only have originated in California.",
    author: "Edsger Dijkstra",
  },
  {
    id: 74,
    quote:
      "The main purpose of software engineering is to control complexity, not to create it.",
    author: "Pamela Zave",
  },
  {
    id: 75,
    quote: "Programming: when the ideas turn into the real things.",
    author: "Maciej Kaczmarek",
  },
  {
    id: 76,
    quote: "The art of programming is the art of organizing complexity.",
    author: "Edsger Dijkstra",
  },
  {
    id: 77,
    quote: "Programming is learned by writing programs.",
    author: "Brian Kernighan",
  },
  {
    id: 78,
    quote: "Deleted code is debugged code.",
    author: "Jeff Sickel",
  },
  {
    id: 79,
    quote:
      "What one programmer can do in one month, two programmers can do in two months.",
    author: "Fred Brooks",
  },
  {
    id: 80,
    quote:
      "A good programmer is someone who always looks both ways before crossing a one-way street.",
    author: "Doug Linder",
  },
  {
    id: 81,
    quote: "Copy and paste is a design error.",
    author: "David Parnas",
  },
  {
    id: 82,
    quote: "Weeks of coding can save you hours of planning.",
    author: "Anonymous",
  },
  {
    id: 83,
    quote:
      "Programming is the art of telling another human what one wants the computer to do.",
    author: "Donald Knuth",
  },
];

export default function generateRandomQuote() {
  return quotes[Math.floor(Math.random() * 83 + 1)].quote;
}

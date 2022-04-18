1. The coding assignment required about 14 hours of work, about 2 hours to quickly plan, understand the assignment and set up the git repo, about 9 more to get to a final product that I was proud of. From there, a little longer to set up the netlify service, check the Lighthouse Audit and the WCAG2.0 compliancy, and another stretch of time working on the testing, which I haven't had much experience doing before this.
	a. If I had more time, I would've made a follow up call to retrieve the covers for every single book, if available. I also would've worked more on the styles but for the size of the app, I figured I was able to get away with minimal styling. Another idea was to create another component within the bookComponent, similar to a product page, just to display a little bit more infomation on this specific book, publisher, detailed on the author, links to an author page, etc. 

2. 

3. I am not sure I have ever had to do this specific request, though I've been asked to increaase performance on many Wordpress Websites. Usually this entails using a Lighthouse Audit, doing my best to descrease photo size, file size, preloading certain assets on the front end, minifying javascript and css, removing any extra files/plugins that may be increasing load times on these sites. In most cases, my first recommendation is to remove Wordpress entirely but unfortunately most won't listen.

4. My first piece of advice to improve this API would be to make it easier to access data from the read API, which I had the most issues with as it would not accept any request I made from the browser. This required me to circumvent this by using my own server to make the get requests and pass the information back to my app. Maybe that is the way it was intended, it just makes testing with the API incredibly difficult to know where to begin. I would also have someone do a more in depth review of the dev docs on this API and share more information with the developers.

let nikolasLatcham = {
	birth_date: ["January 9, 1998", 09/01/1998],
	family: {
		mother: "Michelle Vanderzon",
		father: "Michael Latcham",
		brother: "Magnus Latcham"
	},
	hobbies: ["Football/Soccer", "Lego", "Violin"],
	favourite_movies: ["The Lord of the Rings: The Fellowship of the Ring", "The Royal Tenenbaums", "In Bruges"]
}
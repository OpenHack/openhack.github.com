---
layout: default
title: OpenHack - Your City?
---

## Your City?

We'd love to start OpenHack in as many cities as possible. This site is meant to faciliate starting new OpenHack groups, but isn't meant to actually "run" or "RSVP" for groups. If you want to add your city, here's what you should do:

1. Fork, and clone the [openhack.github.com](https://github.com/openhack/openhack.github.com) repo.
2. Install Ruby (sorry!), and run `rake city=YOUR_CITY_NAME`.<br />So if you live in Bananas, it would be `rake city=Bananas`.
3. This should make a `bananas` directory with an `index.markdown` file for your city.
4. Edit the `index.markdown` file with information about your meetup!
5. Commit your changes, push to your fork, and submit a pull request to the main repo.
6. Once accepted, we'll add you to the main repo so you can update your city's page at any point.

And that's it! If you have feedback on this process, just open up an [issue](https://github.com/openhack/openhack.github.com/issues) and ask a question!

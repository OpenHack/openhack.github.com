---
layout: default
title: OpenHack - Your City?
---

## Your City?

We'd love to start OpenHack in as many cities as possible. This site is meant to facilitate starting new OpenHack groups, but isn't meant to actually "run" or "RSVP" for groups. If you want to add your city, here's what you should do:

1. Fork, and clone the [openhack.github.com](https://github.com/openhack/openhack.github.com) repo.
2. Install Ruby (sorry!), `gem install bundler; bundle`
3. Run `rake city NAME=YOUR_CITY_NAME`.<br />So if you live in "Bananas, NY", it would be `rake city NAME='Bananas, NY'`. This should make a `bananas` directory with an `index.markdown` file for your city. __EXTRA CREDIT__: pass the specific ADDRESS where your group meets to get a more detailed pin on the map. Example: `rake city NAME='Baltimore, MD' ADDRESS='2400 Boston St Baltimore MD 21224'`
4. Edit the `index.markdown` file with information about your meetup! Run `rake` to see the site in action on `http://localhost:4000`.
5. Also edit `_config.yml` to correct the name of your city and its state/country.
6. Commit your changes, push to your fork, and submit a pull request to the main repo. Once accepted, we'll add you to the main repo so you can update your city's page at any point.

And that's it! If you have feedback on this process, just open up an [issue](https://github.com/openhack/openhack.github.com/issues) and ask a question!

### Twitter

If your group will have a presence on Twitter, you can follow these recommendations to get started quickly.

For an example of what this looks like, please see [@OpenHackIC](https://twitter.com/OpenHackIC).

#### Account

Most OpenHack Twitter accounts use usernames like this:

* [OpenHackBHM](https://twitter.com/OpenHackBHM) for Birmingham
* [OpenHackFW](https://twitter.com/OpenHackFW) for Fort Wayne
* [OpenHackIC](https://twitter.com/OpenHackIC) for Iowa City
* [OpenHackNYC](https://twitter.com/OpenHackNYC) for New York City
* [OpenHackPGH](https://twitter.com/OpenHackPGH) for Pittsburgh
* etc.

#### Profile

* Photo: Use [`logo-green.png`](/images/logo-green.png).
* Header: Maybe a picture of your city or one of your meetups.

#### Design

* Background: Use [`tile.png`](/images/tile.png).  Make sure to check the "Tile background" option.
* Background color: `#ddd`
* Link color: `#69b373`
* Overlay: White

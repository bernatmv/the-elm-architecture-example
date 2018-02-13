# Idea

This is not the solution I would use for a production-ready application, but I think it fulfills it's purpose of serving as a technical task.

Some considerations:

- This is an attempt to implement a version of The Elm Architecture
- It's not coupled to any framework (though React as a render framework might have made everything cleaner and simpler)
- Wanted to try Rollup instead of Webpack for this exercice, but couldn't muster the time (already had a boilerplate with Webpack from other projects)
- Did not test it in all supported browsers, I encourage you to submit a bug if you find any (much appreciated)
- Many things missing: i18n, linting, proper testing...

# Not done

Could not get the time to do a perfect solution (I blame the carnival and having kids), so some features are not implemented:

- We could deal with the favorites more gracefully doing an strategy pattern to discern how to treat it if it's a show or a person, but thought it too convoluted for this exercice
- Edge cases not considered: multiple searches one after the other, collisions, etc
- Favorites are not preserved on reload (we can accomplish this with and appropiate service or using local storage)
- Good UX practices: give feedback to the user when loading, etc

# BUG 

- The clicking areas are not properly implemented, it's due to how we capture the events but I did not have any more time to fix it, you might need to click a bit on the border of favorites to select them (buttons work well but had to use a dirty hack to not touch css, again due to how the events are captured, needs a refactor)

# Thank you
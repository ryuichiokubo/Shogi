Shogi
=======
(Name TBD)


Features
-------
- Extensible settings such as changing board size, new kind of piece or special item
- vs Computer via server, vs Human via websocket
- In any device (PhoneGap) and any screen size (SVG)


Roadmap
-------
- Client only (UI with event handling) --> vs Computer --> vs Human


TODO
-------
- better font-family
- require.js
- sennichite, uchihudume


Note
-------
- GAE Java server, HTML+CSS+Javascript client
- Server calculates computer's hands, client draws and calculates allowed moves
- For AI, enough to calculate one step ahead but should be easy to extend and adaptable to any rules

- SVG: object tag didn't work with other HTML elements... using img tag instead

- Or no server ... use web worker

# goodfilms-graph

Choose a random film from [goodfil.ms](http://goodfil.ms) excellent [graph](http:/goodfil.ms/graph/graph.json). Also, crudely tells you if you can find the film on netflix, hulu, amazon, or itunes. Gives you a direct url.

## Usage

```javascript
var goodfilmsGraph  = require('goodfilms-graph');
goodfilmsGraph.random({}, function(err, film) {
  if (err) { return console.error(err); }
  console.log(film);
});
```

Optionally, pass a filter argument of `{x: 4, y: 4}`. This will only select from films that have a rating higher than or equal to a 4 on both the x axis and y axis. The x axis is Goodfil.ms star rating and the y axis is Goodfil.ms 'rewatchable' rating.  

```javascript
var goodfilmsGraph  = require('goodfilms-graph');
goodfilmsGraph.random({x: 4, y: 4}, function(err, film) {
  if (err) { return console.error(err); }
  console.log(film);
});
```


The outputted film object generally looks like this.

```json
{
  image: 'http://cf2.imgobject.com/t/p/w154/hC9u7vlma8c4h0ibX2KmfOksn2F.jpg',
  title: 'What\'s Eating Gilbert Grape',
  year: 1993,
  id: 60302,
  x: 4.237359687181692,
  y: 3.1091803168081897,
  radius: 5.484796933490655,
  url: '/film/60302-what-s-eating-gilbert-grape',
  netflix_url: 'http://goodfil.ms/film/60302-what-s-eating-gilbert-grape/netflix_url',
  itunes_url: null,
  amazon_url: null,
  hulu_url: null 
}
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Running tests

```bash
npm test
```



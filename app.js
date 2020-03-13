
let url= "https://docs.google.com/spreadsheets/d/1kkg45Z5bjFHx27UMlTrIGjzm12GDoqMksyqX8CPPFh0/edit#gid=0"

let id = '1kkg45Z5bjFHx27UMlTrIGjzm12GDoqMksyqX8CPPFh0'

// let source = `https://spreadsheets.google.com/feeds/list/1Ox49O2OQueIyS5QUvW0Jp1bW7SDUO1Rge2cf-b_2LfU/od6/public/values?alt=json`
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`

// ES6 - fetch

// fetch queries the url provided and requests that the data be sent to it 
// it receives JSON => JS Object Notation
// we use .json() to parse the data from "{}" to an full blown {}
fetch(source)
  .then( response => response.json() ) // this parses the data from string back into an object
  .then( data =>  {
      console.log('data', data)
      // data.feed.entry is the array that stores our projects
      // the projects are stored as objects
      let projects = data.feed.entry.map( project => {
        // console.log('project', project.gsx$title.$t)
        return {
          title: project.gsx$title.$t,
          image: project.gsx$image.$t,
          description: project.gsx$description.$t,
          url: project.gsx$url.$t
        }
      })
      app(projects)
  }) // this provides us access to the parse data
  // .catch( err => console.log('err', err))

  let $sectionContainer = $('.projects')

function app(projects) {
   projects.forEach(function(element) {
     let $cardContainer = $('<div>').addClass('card')
     let $imgContainer = $('<div>').addClass('cardBackground')
     let $infoBody = $('<div>').addClass('cardBody')
     $cardContainer.append($imgContainer)
     $cardContainer.append($infoBody)
     let $cardHead = $('<h4>').addClass('card-title')
     let $cardParagraph = $('<p>').addClass('card-text')
     $cardHead.append(element['title'])
     $cardParagraph.append(element['description'])
     $infoBody.append($cardHead)
     $infoBody.append($cardParagraph)
     $imgContainer.css('background-image', 'url("'+ element['image'] +'")')
     let $buttonPrimary = $('<button>').addClass('projectBtn').html('See the app')
     $infoBody.append($buttonPrimary)
    $sectionContainer.append($cardContainer)
    $buttonPrimary.on('click', function() {
        window.open(element['url'])
        return false
    })
   })
}


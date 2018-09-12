$(function(){
    
    $('#searchForm').on('submit',function(event){
        
        event.preventDefault();
        
        var term = $('.term').val();
        
        if(term == '')
            return alert('please type your movie!');
        
        
        $.ajax({
          dataType: "json",
          url: 'http://api.tvmaze.com/search/shows?q='+term,
          data: {},
          success: function(data)
            {
                console.log(data);
                $('.movie-holder').html('');
                if(data && data.length > 0)
                    createMovieElement(data);
                else
                    $('.movie-holder').html('<div class="no-result"> No Result  !</div>');
            }
        });
    })
    
    
    
    
    var createMovieElement = function(items)
    {
        if(items)
            for(var i=0 ; i<items.length  ; i++)    
            {
                targetMovie = items[i];
                var html = $(' <div class="col-md-3 col-xs-12"><div class="movie">'+
                        '<img class="img" src="'+targetMovie.show.image.medium+'" />'+
                        '<div class="info-holder">'+
                            '<div class="name">'+targetMovie.show.name+'</div>'+
                             '<div class="score">score : '+(Math.round(targetMovie.score * 100) / 100)+'</div>'+
                             '<div class="desc">Genres : '+targetMovie.show.genres.join(' , ')+'</div>'+
                             '<div class="desc">'+targetMovie.show.summary+'</div>'+
                             '<div class="desc center"><a target="_blank" href="'+targetMovie.show.url+'"> Link </a></div>'+
                        '</div>'+
                    '</div></div>');

                $('.movie-holder').append(html);
                html.on('click',function(){
                    showSeasons(targetMovie.show.id);
                    $('#myModal').modal({});
                })

            }
    }
    
    
    
    var showSeasons = function(id)
    {
         $('.content-seasons-holder').html('<div class="loading"> Loading ... </div>');
        
        $.ajax({
          dataType: "json",
          url: 'http://api.tvmaze.com/shows/'+id+'/seasons',
          data: {},
          success: function(data)
            {
                $('.content-seasons-holder').html('');
                console.log('seasons',data);
                if(data)
                    for(var i=0 ; i<data.length  ; i++)    
                    {
                        var season = data[i];
                        html = $('<div class="season row">'+
                                        '<div class="col-xs-12 row " style="width:100%" > <div class="col-xs-6 key"> id  :</div> <div class="col-xs-6 value"> '+season.id+'  </div> </div>'+
                                        '<div class="col-xs-12 row" style="width:100%" > <div class="col-xs-6 key"> url :</div> <div class="col-xs-6 value"> <a href="'+season.url+'">'+season.url+' </a> </div> </div>'+
                                        '<div class="col-xs-12 row" style="width:100%" > <div class="col-xs-6 key"> name :</div> <div class="col-xs-6 value"> '+season.name+' </div> </div>'+
                                        '<div class="col-xs-12 row" style="width:100%" > <div class="col-xs-6 key"> endDate :</div> <div class="col-xs-6 value"> '+season.endDate+' </div> </div>'+
                                '</div>');
                        $('.content-seasons-holder').append(html);
                        
                        
                    }
            }
        });
    }
     
    
    
    
    
    
})
var channelName = 'Kripparrian';
var vidWidth = '500';
var vidHeight= '400';
var vidResults = 3;

$(document).ready(function(){
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part:'contentDetails',
            forUsername:channelName,
            key:'AIzaSyBkj1W-esgmhtr44LX82sixZRfl0_QjQZg'},
            function(data){
                $.each(data.items,function(i,item){
                    var pid = item.contentDetails.relatedPlaylists.uploads;
                    getVids(pid);
            });
        }
    );  
});

function getVids(pid){
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part:'snippet',
            maxResults:vidResults,
            playlistId: pid,
            key:'AIzaSyBkj1W-esgmhtr44LX82sixZRfl0_QjQZg'},
            function(data){
                var output;
                $.each(data.items,function(i,item){
                    videTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    output = '<li><iframe class="col-sm-12" height="'+vidHeight+'" width="'+vidWidth+'"src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
                    $('#results').append(output);
            });
        }
    );  
}

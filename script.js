function display(data)
{
console.log('Image clicked');
}

window.onload= function() {
	console.log('Window open');
	//localStorage.clear();

    //Getting the visited value to check if the site is being visited first time or being redirected to it again
	var visit=localStorage.getItem("visited");
	if(visit !== undefined && visit !== null && visit == 1)
		apiCall();	
	
}

function apiCall()
{
	var movie=document.getElementById('theSearch').value;
	//if search bar is empty and being redirected again,we load the previous state
    if(movie==='' && localStorage.getItem("visited")==1)
	{
		movie=localStorage.getItem("oldmovie");
		var data=JSON.parse(localStorage.getItem("prevstate"));
		for(var i=0;i<data.Search.length;i++)
        {
        	var img = document.createElement('img'); 
        	img.src =  data.Search[i].Poster; 
        	img.onclick = function(data) {
        		
        		window.open('display.html?myvar='+data.Search[i],"_parent");
        	}
        	document.getElementById('column').appendChild(img);
        	localStorage.setItem("visited",0);
        }
	}
    //else we use Fetch API to connect to OMDb to retrieve information about the movie being searched
	else
	{
	document.getElementById('column').innerHTML="";
	fetch('http://www.omdbapi.com/?apikey=8ba23e8&s='+movie)
    .then(result => result.json())
    .then(data => {
        console.log("data",data);
        var data1=data;
        localStorage.setItem("visited",1);
        localStorage.setItem("prevstate",JSON.stringify(data));
        
        console.log(data.Search.length);
        localStorage.setItem("oldmovie",movie);

        //appending all the images
        for(var i=0;i<data.Search.length;i++)
        {
        	var img = document.createElement('img'); 
        	img.src =  data.Search[i].Poster; 
        	img.rec=data.Search[i];
        	localStorage.setItem(data.Search[i].Poster,data.Search[i]);
        	//when we click an image,we are being directed to display page
        	img.onclick = function(dat) {
        		localStorage.setItem("currimg",img.src);
				var newwindow=window.open('display.html',"_blank");
        	}
        	document.getElementById('column').appendChild(img);
        }
        //localStorage.clear();
    });
   }
}


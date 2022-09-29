//test
//https://www.nzherald.co.nz/sport/netball-no-sympathy-from-dame-noeline-taurua-as-jamaica-to-rely-on-mystery-player-for-silver-ferns-series/OBWEFHP3JRVVRUS63U2CQB76GE/

console.log("in content.js top....");

//window.document.addEventListener("load", () => {
//    console.log("document load event reached...");
//    window.localStorage.clear();
//},false);

//window.localStorage.clear();

//browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//    console.log("Received response: ", response);
//});
//
//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request: ", request);
//});


//function sleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){
        /* Do nothing */
    }
}

/*
function removeBanner(){
    console.log("in my remove banner script....");

    
    
    promptTags = document.getElementsByClassName("got-prompt___container");
    if(promptTags.length>0){
        console.log("remove prompt___container ....")
        promptTags[0].remove();
    }



    //ga_ppv is size of content change, should be large enough.
    document.cookie = "ga_ppv=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "ga_ppv=9000|NZH:article:AllBlacks|NZH:article|NZH:c-80|NZH:NZHerald"+ "; expires=" + (new Date(Date.now() + 9999999)).toGMTString() + "; path=/; ";
    window.localStorage.clear();
 
    bannerTags = document.getElementsByClassName("article-offer");
    console.log("banner tags count:" + bannerTags.length);
    
    //if no banner, return.
    if(bannerTags.length > 0){
        //remove all videos
        var videoTags = document.getElementsByClassName("video-outer")
        for(var i = videoTags.length-1; i >= 0 ; i--){
            videoTags[i].remove()
        }
        
        //remove all iframes
        var iframeTags = document.getElementsByTagName("iframe")
        for(var i = iframeTags.length-1; i >= 0 ; i--){
            iframeTags[i].remove()
        }
        
        //remove all scripts
//        var jsTags = document.getElementsByTagName("script")
//        for(var i = jsTags.length-1; i >= 0 ; i--){
//            jsTags[i].remove()
//        }

        //remove all anchor links
//        var aLinkTags = document.getElementsByTagName("a")
//        for(var i = aLinkTags.length-1; i >= 0 ; i--){
//            aLinkTags[i].remove()
//        }
        
        var magicString = "";
//        isUserAction = "SureNot";
//        if(typeof oParams !== 'undefined'){
//            console.log("add oParams items....")
//            oParams.visitor_id = oParams.author;
//        }
//        //document.cookie.split(';')
        isBlurred = true; //pass pp_timer reset.
        pp_time = 0;  //pp_time is time base, should be old/small enough.
//        ga_pp_timer_offer = 0;
        
        
       
        //try to find out the magic string
        var wholePage = document.getElementsByTagName("body")[0].innerHTML;
        for(var el of document.getElementsByTagName("p")) {
            if( el.attributes.class != null){
                //
                if(el.attributes.class.value != "" && el.style.display == "none"){
                    magicString = el.attributes.class.value;
                    console.log(magicString);
                    //construct regular expression to search whole page by magic string.
                    pLengthNumber = wholePage.match(new RegExp(magicString,'g')).length
                    
                    //why 10? maybe 5 or other smaller number.
                    if(  pLengthNumber > 10){
                        break;}
                }
            }
        }
    
        //remove none display attributes.
        if( magicString != "" ){
            var pBlocks = document.querySelectorAll('p.'+magicString)
            var spanBlocks = document.querySelectorAll('span.'+magicString)
            
            //var myDiv = document.createElement("div");
            
            for(var i=0;i<pLengthNumber;i++) {
                if(pBlocks[i] != null){
//                    myP = pBlocks[i].cloneNode(true);
//                    myP.className = "myNew";
//                    myP.style = "display: block;";
//                    myDiv.appendChild(myP);
                    pBlocks[i].className = "myNew";
                    pBlocks[i].style = "display: block;";
//                    pBlocks[i].removeAttribute("style");
                    //pBlocks[i].removeAttribute("class");
                }
                if(spanBlocks[i] != null){
                    spanBlocks[i].className = "myNew";
                    spanBlocks[i].style = "display: block;";
//                    spanBlocks[i].removeAttribute("style");
                    //spanBlocks[i].removeAttribute("class");

                }
            }
            
            //spanBlocks[0].appendChild(myDiv);
           
            //remove promote banner
            for(var i = bannerTags.length-1; i >= 0 ; i--){
//                bannerTags[i].remove();
                bannerTags[i].style.visibility="hidden";
            }
//            console.log("start sleep...");
//            sleepFor(5000);
//            console.log("sleep end...");
        }
    }

//    document.body.innerHTML = document.body.innerHTML;
//    console.log("remove listeners ...");
//    window.document.addEventListener("load",function(event){
//        event.stopImmediatePropagation();
//    }, true);
//    window.document.addEventListener("scroll", function(event){
//        event.stopImmediatePropagation();
//    }, true);
//    window.document.addEventListener("resize", function(event){
//        event.stopImmediatePropagation();
//    }, true);
//    window.document.addEventListener("focus", function(event){
//        event.stopImmediatePropagation();
//    }, true);
//    window.document.addEventListener("blur", function(event){
//        event.stopImmediatePropagation();
//    }, true);
//
//
//    window.document.onload = null;
//    window.document.onscroll= null;
//    window.document.onresize = null;
//    window.document.onfocus = null
//    window.document.onblur = null;
//
//    window.document.addEventListener = function(type,listener){};
//    EventTarget.prototype.addEventListener = function(type,listener){};

    getEventListeners(document).visibilitychange.forEach(e=>{document.removeEventListener("visibilitychange",e.listener);})

}
*/

function longSleep(){
    console.log("start sleep...");
//    sleepFor(20000);
    var pBlocks = document.querySelectorAll('p.myNew');
    for(var i=0;i<pBlocks.length;i++) {
        if(pBlocks[i] != null){
            pBlocks[i].style = "display: block;";
        }
    }
    console.log("sleep end...");
}

//document.addEventListener("DOMContentLoaded", function(event) {
//    safari.extension.dispatchMessage("Hello World!");
//});
//document.addEventListener("load", removeBanner);
//
//window.addEventListener("load", () => {
//    console.log("window load event reached...");
//    removeBanner();
//    window.document.addEventListener("load", () => {
//        console.log("document load event reached...");
//    },false);
//    //document.detachEvent("onload", ga_.ppv_s("timer"));
//    window.localStorage.clear();
//    //window.localStorageFallback.clear();
//});
//window.addEventListener("load",removeBanner);
//window.addEventListener("keypress",removeBanner);
//window.addEventListener("keypress",longSleep);

//window.addEventListener("DomContentLoaded", () => {
//    console.log("DomContentLoaded event reached...");
//    window.localStorage.clear();
//    //window.localStorageFallback.clear();
//    removeBanner();
//});

//getEventListeners(document).visibilitychange.forEach(e=>{document.removeEventListener("visibilitychange",e.listener);})
//getEventListeners(window).visibilitychange.forEach(e=>{document.removeEventListener("visibilitychange",e.listener);})

//document.addEventListener("load",function(event){
//    event.stopImmediatePropagation();
//}, true);
//document.addEventListener("scroll", function(event){
//    event.stopImmediatePropagation();
//}, true);
//document.addEventListener("resize", function(event){
//    event.stopImmediatePropagation();
//}, true);
//document.addEventListener("focus", function(event){
//    event.stopImmediatePropagation();
//}, true);
//document.addEventListener("blur", function(event){
//    event.stopImmediatePropagation();
//}, true);
//
console.log("in content.js bottom...");

/*
<script type="application/ld+json">
{
    "@context":"http://schema.org",
    "@type":"Article",
    "mainEntityOfPage":{
        "@type":"WebPage",
        "@id":"https%3A%2F%2Fwww.nzherald.co.nz%2Fsport%2Fall-blacks-v-wallabies-captain-sam-cane-in-doubt-as-multiple-changes-likely-for-all-blacks-second-test-against-australia%2FSQLTUI3XQTGNVD6ZZCJQDXGUS4%2F"},
    "publisher":{
        "@type":"Organization",
        "name":"NZ Herald",
        "logo":{"@type":"ImageObject","url":"https://www.nzherald.co.nz/pb/resources/assets/icons/navigation/site-logo/png/nzh-logo.png"}
        
    },
    "author":{
        "@type":"Person",
        "name":"Liam Napier"
    },
    "datePublished":"2022-09-20T03:30:00Z",
    "dateModified":"2022-09-20T03:55:28.488Z",
    "headline":"All Blacks v Wallabies: Captain Sam Cane in doubt as multiple changes likely for All Blacks' second test against Australia",
    "image":["https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/3DRQRT7EQCIUB57I3NSHWEW4TM.jpg"],
    "isAccessibleForFree":"False",
    "hasPart":[
        {
        "@type":"WebPageElement",
        "isAccessibleForFree":"False",
        "cssSelector":".eGIZaKKkRMIXMnK"
        },
        {
        "@type":"WebPageElement",
        "isAccessibleForFree":"True",
        "cssSelector":".eGIZaKKkRMIXMnKv"}]
 
 }
</script>

<script type="application/ld+json">
{
    "@context":"http://schema.org",
    "@type":"Article",
    "mainEntityOfPage":{
        "@type":"WebPage",
        "@id":"https%3A%2F%2Fwww.nzherald.co.nz%2Fsport%2Fall-blacks-v-wallabies-captain-sam-cane-in-doubt-as-multiple-changes-likely-for-all-blacks-second-test-against-australia%2FSQLTUI3XQTGNVD6ZZCJQDXGUS4%2F"
        
    },
    "publisher":{
        "@type":"Organization",
        "name":"NZ Herald",
        "logo":{
            "@type":"ImageObject",
            "url":"https://www.nzherald.co.nz/pb/resources/assets/icons/navigation/site-logo/png/nzh-logo.png"}
        },
    "author":{
        "@type":"Person",
        "name":"Liam Napier"
        },
    "datePublished":"2022-09-20T03:30:00Z",
    "dateModified":"2022-09-20T03:55:28.488Z",
    "headline":"All Blacks v Wallabies: Captain Sam Cane in doubt as multiple changes likely for All Blacks' second test against Australia",
    "image":["https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/3DRQRT7EQCIUB57I3NSHWEW4TM.jpg"],
    "isAccessibleForFree":"False",
    "hasPart":
    [{
        "@type":"WebPageElement",
        "isAccessibleForFree":"False",
        "cssSelector":".eGIZaKKkRMIXMnK"},
     {
        "@type":"WebPageElement",
        "isAccessibleForFree":"True",
        "cssSelector":".eGIZaKKkRMIXMnKv"
        
     }]
    
}
</script>
*/


function removeElementsByClassName(className){
    //className
    allBlocks = document.getElementsByClassName(className);
    for(var i = allBlocks.length-1; i >= 0 ; i--){
        allBlocks[i].remove()
    }
}

function removeElementById(Id){
    //Id
    var adPanel = document.getElementById(Id);
    if(adPanel != null) adPanel.remove();
}


function removeAD(){
    
    var IdList = ["pd_div","premium-toaster"];
    var ClassNameList = ["ad","ad-video","ad-zone","adsninja-ad-zone","adsbygoogle", "commenting__paywall","email-boost","frameElement","google-auto-placed","interstitial","recommended-articles"];
    
    
    IdList.forEach(element => removeElementById(element));
    
    ClassNameList.forEach(element => removeElementsByClassName(element));
    
}



//Site Check algorithm:
/*
n = function() {
    var e = [].slice.call(document.getElementsByClassName("eGIZaKKkRMIXMnK")),
        t = document.getElementsByClassName("article__body")[0];
    if (void 0 !== t) {
        var n = t.getElementsByTagName("p").length;
        n > 11 && (e.push(t.getElementsByTagName("p")[5]), e.push(t.getElementsByTagName("p")[n - 4]), e.push(t.getElementsByTagName("p")[n - 7]), e.push(t.getElementsByTagName("p")[n - 9]), e.push(t.getElementsByTagName("p")[n - 11]))
    }
    e.forEach((function(e) {
        void 0 === e || function(e) {
            return "none" === window.getComputedStyle(e).display || e.offsetWidth <= 0 && e.offsetHeight <= 0
        }(e) || r()
    }))
},
*/
//so if e===0 && t===0, the check will be passed.
function removeBanner(){
    console.log("in my remove banner script....");

    //remove all functions setInterval. Here is the key because SITE checks user's states with those functions.
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }

    bannerTags = document.getElementsByClassName("article-offer");
    
    //if no banner, return.
    if(bannerTags.length > 0){
        
        //remove promote banner
        for(var i = bannerTags.length-1; i >= 0 ; i--){
            bannerTags[i].remove()
        }
//
//
//        //remove all scripts
//        var jsTags = document.getElementsByTagName("script")
//        for(var i = jsTags.length-1; i >= 0 ; i--){
//            jsTags[i].remove()
//        }
//
//        //remove all iframes
//        var iframeTags = document.getElementsByTagName("iframe")
//        for(var i = iframeTags.length-1; i >= 0 ; i--){
//            iframeTags[i].remove()
//        }
 
        var magicString = ""
        
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
            
//            bodyTags = document.getElementsByClassName("article__body");
//            if(bodyTags.length>0)
//                document.getElementsByClassName("article__body")[0].className = "newBody";
            
            var allBlocks = document.getElementsByClassName(magicString)
            
            for(var i=0;i<allBlocks.length;i++) {
                var newName = allBlocks[i].className.toString();
                
                if( typeof allBlocks[i] === 'object' && typeof (allBlocks[i].style) === 'object' && allBlocks[i].style != null && allBlocks[i].style != "" ){
                    var newStyle = allBlocks[i].style.toString();
                    allBlocks[i].style = newStyle.replace("none","block");
                    allBlocks[i].className = newName.replace(magicString,"newP");
                }
            }
            
            
//            var pBlocks = document.querySelectorAll('p.'+magicString)
//            var spanBlocks = document.querySelectorAll('span.'+magicString)
//
//            for(var i=0;i<pLengthNumber;i++) {
//                if(pBlocks[i] != null){
//                    pBlocks[i].removeAttribute("style");
//                    pBlocks[i].removeAttribute("class");
//                }
//                if(spanBlocks[i] != null){
//                    spanBlocks[i].removeAttribute("style");
//                    spanBlocks[i].removeAttribute("class");
//                }
//            }
        }
    }
    

    
    console.log("Advertise has been removed!");
    removeAD();
}
console.log("Jump into my banner remover!");

window.addEventListener("load",removeBanner);


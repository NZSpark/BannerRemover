
Date.prototype.monthDays = function (month) {
  var d = new Date(this.getFullYear(), month + 1, 0);
  return d.getDate();
};

var ga_ = {};
//cookie write
ga_.setCookie = function (v, n, e) {
  var a = new Date(),
    b,
    c,
    d;
  b = n ? n : "ga_";
  if (e) {
    c = e == 0 ? 1800000 : e * 86400000;
  } else {
    c = 99999999999;
  }
  if (b.indexOf("ga_pp_timer_") > -1) {
    c = 10800000;
  }
  a.setTime(a.getTime() + c);
  d = "; expires=" + a.toGMTString();
  document.cookie = b + "=" + v + d + "; path=/";
};
//cookie read
ga_.GetTimeLengthFromCookie = function (n) {
  var a,
    b,
    c,
    d,
    e = n ? n : "ga_",
    f = "length";
  a = document.cookie.split(";");
  for (var i = 0; i < a[f]; i++) {
    b = $utils.trim(a[i]);
    if (b && b.indexOf(e) == 0) {
      c = b.substring(e[f] + 1, b[f]);
    }
  }
  d = c ? c : "";
  return d;
};

ga_.ss = function () {
  var a,
    b,
    c,
    f = Math,
    g = "max",
    h = document,
    q = h.documentElement,
    j = window,
    k = j.screen,
    l = "client",
    m = "Width",
    n = "Height",
    o = "inner",
    p = "avail";
  a = f[g](q[l + m], j[o + m] || 0);
  b = f[g](q[l + n], j[o + n] || 0);
  c = "&ns_innersize=" + a + "x" + b;
  a = k[p + m];
  b = k[p + n];
  c = c + "&ns_screen=" + a + "x" + b;
  return c;
};

var gtm = (function () {
  var pub = {};
  var pubName = "NZH";
  var siteName = "development";
  var aParams = {};
  //var clientID    = 6820959;
  var currentDate = new Date();
  var cYear = currentDate.getFullYear();
  var cMonth = currentDate.getMonth();

  // Public functions
  pub.init = function (publication, site) {
    pubName = publication;
    siteName = site;
    // Check the sessioncui cookie during initalization
    //set the unique id cookie for this browser
    var s_cui = new Date().getTime() + "-" + Math.random() * 1000;
    var mc = 0,
      dr = 30,
      monthly_mc = cMonth + ":0";
    if (
      $utils.cookie("sessioncui") === undefined ||
      $utils.cookie("sessioncui") === "" ||
      $utils.cookie("sessioncui") === null
    ) {
      var cdate = Math.round(new Date().getTime() / 1000);
      // aCookie[ session user id , cookie create date , days remaining , metering count ]
      var cval = s_cui + "|" + cdate + "|" + dr + "|" + mc + "|" + monthly_mc;
      $utils.cookie("sessioncui", cval, { path: "/", expires: 365 * 5 });
    } else {
      var aCookie = $utils.cookie("sessioncui").split("|");
      daysRemaining =
        30 -
        parseInt(
          (Math.round(currentDate.getTime() / 1000) - parseInt(aCookie[1])) / (60 * 60 * 24)
        );
      var dt = new Date(aCookie[1] * 1000);
      //if Cookie start date is July 2014 and first time since changeover then add Julys metering count to Julys monthly cookie data
      if (dt.getMonth() == 6 && dt.getFullYear() == "2014" && aCookie.length == 4) {
        var aDateCont = [];
        aDateCont[0] = "6:" + aCookie[3];
        var k = 0;
        for (k = 7; k <= cMonth; k++) {
          aDateCont[k - 6] = k + ":0";
        }
        aCookie[4] = aDateCont.join(",");
      } else if (aCookie.length > 4) {
        //if they have skipped a month or months
        //Have new format of data so now check that all recent months have data eg 6:23,7:0,8:32
        var m,
          i,
          k = 0,
          max,
          index_sum,
          aDateCont = [],
          ar = [];
        aCookie[4] = aCookie[4].replace(/,\s*$/, "");
        var aMonthly = aCookie[4].split(",");
        last_month = aMonthly[aMonthly.length - 1].split(":")[0];

        if (last_month > cMonth) {
          //add 12 months from the new year
          max = cMonth + 12;
        } else {
          max = cMonth;
        }
        //if there is a gap then populate empty months
        if (!(last_month == max - 1)) {
          for (k = 0; k <= max - last_month - 1; k++) {
            index_sum = parseInt(k) + parseInt(last_month) + 1;
            aDateCont[k] = (index_sum % 12) + ":0";
          }
        }
        //join empty months to existing months
        if (aDateCont.length > 0) {
          //aCookie[4] = aCookie[4] + ',' + aDateCont.join(',');
          ar = ar.concat(aMonthly, aDateCont);
        } else {
          ar = aMonthly;
        }
        if (ar.length > 6) {
          //trim  array to max 6 months of data
          aCookie[4] = ar.slice(ar.length - 7, ar.length - 1).join(",");
        } else {
          aCookie[4] = ar.join(",");
        }
      } else if (aCookie.length == 4) {
        //No mc in july and no Monthly Counts setup: Old cookie format and hasn't been here for a long time
        aCookie[4] = monthly_mc;
        aCookie[5] = "light";
      }

      //check the users cookie has a start date = to this month
      if (cYear == dt.getFullYear() && cMonth == dt.getMonth()) {
        aCookie[2] = daysRemaining; // Decrement the number of days remaining
      } else {
        //New Month
        aCookie[1] = Math.round(currentDate.getTime() / 1000);
        aCookie[2] = dr;
        aCookie[3] = mc;

        var dt = new Date(aCookie[1] * 1000);
        localStorageWrapper.setItem("alist", "");
      }

      $utils.cookie("sessioncui", aCookie.join("|"), {
        path: "/",
        expires: 365 * 5
      });
    }

    // Check the cookie and page and increment the count n track it
    if (window.Fusion.globalContent && window.Fusion.globalContent.type) {
      if (
        window.Fusion.globalContent.type === "story" ||
        window.Fusion.globalContent.type === "video" ||
        window.Fusion.globalContent.type === "gallery"
      ) {
        var articleID = window.Fusion.globalContent.id || undefined;

        if (!articleID) return;

        // Move alist cookie to alist localstorage if exists
        var aListFromCookie = $utils.cookie("alist");

        if (typeof aListFromCookie !== "undefined") {
          localStorageWrapper.setItem("alist", aListFromCookie);
          // Remove the old cookie
          $utils.cookie("alist", "", { path: "/", expires: -1 });
        }

        var aList = localStorageWrapper.getItem("alist");

        if (aList === null) {
          localStorageWrapper.setItem("alist", articleID);
          incrementArticleCount();
        } else {
          aList = aList.split("|");

          // set limit on number of items
          var maxArticleCount = 100;
          if (aList.length >= maxArticleCount) {
            aList = aList.slice(aList.length - maxArticleCount + 1, aList.length);
          }

          if ($utils.inArray(articleID, aList) < 0) {
            aList.push(articleID);
            localStorageWrapper.setItem("alist", aList.join("|"));
            incrementArticleCount();
          }
        }

        // Record a list of legacy object ids for Tohu exclusion.
        // This should be a temporary measure until Tohu changes to use ArcIDs
        var aListObjectID = localStorageWrapper.getItem("alisto");
        var contentObjectID = window.Fusion.globalContent.source.source_id || undefined;

        if (typeof contentObjectID !== "undefined") {
          if (aListObjectID === null) {
            localStorageWrapper.setItem("alisto", contentObjectID);
          } else {
            aListObjectID = aListObjectID.split("|");

            // set limit on number of items
            var maxContentCount = 100;
            if (aListObjectID.length >= maxContentCount) {
              aListObjectID = aListObjectID.slice(
                aListObjectID.length - maxContentCount + 1,
                aListObjectID.length
              );
            }

            if ($utils.inArray(contentObjectID, aListObjectID) < 0) {
              aListObjectID.push(contentObjectID);
              localStorageWrapper.setItem("alisto", aListObjectID.join("|"));
            }
          }
        }
      }
    }
  };

  //Get the oParams object
  pub.getDataPacket = function () {
    return oParams;
  };

  pub.getNZMEID = function () {
    var nzmeID = undefined;
    if (typeof myAccount !== "undefined" && myAccount.isSignedIn() && myAccount.profile.nzmeId) {
      nzmeID = myAccount.profile.nzmeId;
    }
    return nzmeID;
  };

  pub.getUUID = function () {
    var userUUID = undefined;
    if (typeof myAccount !== "undefined" && myAccount.isSignedIn() && myAccount.profile.legacyId) {
      userUUID = myAccount.profile.legacyId;
    }
    return userUUID;
  };

  pub.getArcUUID = function () {
    var arcUUID = undefined;
    if (typeof myAccount !== "undefined" && myAccount.isSignedIn() && myAccount.profile.uuid) {
      arcUUID = myAccount.profile.uuid;
    }
    return arcUUID;
  };

  pub.getGAID = function () {
    var gid = $utils.cookie("_ga");
    if (gid !== undefined && gid != "undefined" && gid != "") {
      return gid.substr(6, gid.length);
    } else {
      return undefined;
    }
  };

  pub.getArticleReadCount = function () {
    var sessioncui = $utils.cookie("sessioncui");
    var aCookie = (sessioncui && sessioncui.split("|")) || [];
    return aCookie[3] !== "" ? aCookie[3] : undefined;
  };

  //sets the current page data and time on page to be used on the next page
  pub.track = function () {
    pp_time = new Date().getTime();
    ga_.ppv_s();
    ga_.ppv_l();
  };

  pub.initializeOptimize = function () {
    // Google Optimize must be initialized after GTM
    const script = window.document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.googleoptimize.com/optimize.js?id=OPT-MBJJDRT";

    document.body.appendChild(script);
  };

  // Initialize GTM Script
  pub.initializeGTM = function () {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src =
        "https://www.googletagmanager.com/gtm.js?id=" +
        i +
        dl +
        "&gtm_auth=8ZbXwo5fCcHIaKT1Q4hZPg&gtm_preview=env-147&gtm_cookies_win=x";

      /* Custom listener for GTM load - start */
      j.addEventListener("load", function () {
        var _ge = new CustomEvent("gtm_loaded", { bubbles: true });
        d.dispatchEvent(_ge);
      });
      /* Custom listener - end */

      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-KGJ3NMV");
  };

  // dataLayer push to GTM
  pub.pageDimensions = function (obj) {
    var gtm_data = obj;

    //add the page dimension event
    $utils.extend(gtm_data, { event: "page_dimensions" });

    // If not the registration App
    if (!document.querySelector(".coco-app") && window.dataLayer) {
      // Send data to the GTM dataLayer
      window.dataLayer.push(gtm_data);

      pub.initializeOptimize();
    }
  };

  // track custom variables like widget interactions or quick read.
  pub.customTrack = function (event, category, action, label) {
    var obj = {
      event: event,
      category: category,
      action: action,
      label: label
    };

    for (var i in obj) {
      if ($utils.trim(obj[i]) === "") {
        delete obj[i];
      }
    }

    obj["name"] = oParams["name"];
    obj["section"] = oParams["section"];
    obj["page_type"] = oParams["page_type"];
    obj["visitor_id"] = oParams["visitor_id"];
    obj["arc_uuid"] = oParams["arc_uuid"];

    if (typeof oParams["ref_type"] !== "undefined") {
      obj["ref_type"] = oParams["ref_type"];
    }
    if (typeof oParams["objectid"] !== "undefined") {
      obj["objectid"] = oParams["objectid"];
    }

    if (!document.querySelector(".coco-app") && window.dataLayer) {
      window.dataLayer.push(obj);
    }
  };

  pub.ecommerceTracking = function (event, content) {
    var obj = {
      event: event,
      ecommerce: content
    };
    if (!document.querySelector(".coco-app") && window.dataLayer) {
      // Clear the previous ecommerce object (as per Google documentation).
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push(obj);
    }
  };

  pub.matherTracking = function (type, category, action, extra) {
    matherObj = {
      type: type,
      category: category,
      action: action
    };

    if (action === "subscription_selected") {
      $utils.extend(matherObj, {
        offers: extra
      });
    }
    (window._matherq = window._matherq || []).push([
      "paywallEvent",
      matherObj,
      { userId: oParams.arcUUID }
    ]);
  };

  pub.params = function (p) {
    aParams = p;
  };

  pub.getParams = function (param) {
    // Set default param values
    param = getDefaultVal(param);

    if (param != "" && aParams.hasOwnProperty(param)) {
      return aParams[param];
    } else {
      return aParams;
    }
  };

  pub.getVisitorID = function () {
    //returns the userhive UUID
    if (
      $utils.cookie("cui") !== undefined &&
      $utils.cookie("cui") != "undefined" &&
      $utils.cookie("cui") != ""
    ) {
      return $utils.cookie("cui");
    } else {
      return "";
    }
  };

  pub.userIsSubscriber = function () {
    return false;
  };

  pub.getSubscriberID = function () {
    if (
      $utils.cookie("subid") !== undefined &&
      $utils.cookie("subid") != "undefined" &&
      $utils.cookie("subid") != ""
    ) {
      return $utils.cookie("subid");
    } else {
      return undefined;
    }
  };

  pub.getPubName = function () {
    return pubName;
  };

  pub.getSiteName = function () {
    return siteName;
  };

  pub.getPageReferrer = function () {
    var urlVars = location.search.substring(1);
    urlVars = urlVars
      ? JSON.parse(
          '{"' + urlVars.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
          function (key, value) {
            return key === "" ? value : decodeURIComponent(value);
          }
        )
      : {};
    var sTemp = urlVars["ref"] !== undefined ? urlVars["ref"] : "";

    if (sTemp != "") {
      return sTemp;
    } else if (document.referrer != "") {
      if (document.referrer.search(/dynamic.nzherald.co.nz\/email\/index.cfm/i) != -1) {
        return pubName + ":emailfriend";
      } else if (
        document.referrer.search(/www.nzherald.co.nz\/google\/gadget\/topstories.xml/i) != -1
      ) {
        return pubName + ":tsgadget";
      }
    }
    return "";
  };

  // Get page name - register/login/newsletter_setup/profile_setup
  pub.getProfilePageName = function (path) {
    if (path != "" && path != undefined) {
      var page_path = path;
    } else {
      var page_path = window.location.pathname;
    }
    var oPages = {};
    var oProfile = {
      "sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:register"
      },
      "identity/": {
        page_type: "NZH:identity",
        name: "NZH:identity",
        section: "NZH:register"
      },
      "upgrade/": {
        page_type: "NZH:upgrade",
        name: "NZH:upgrade",
        section: "NZH:register"
      },
      "register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:register"
      },
      "register/newsletters-setup/": {
        page_type: "NZH:newsletter_setup",
        name: "NZH:newsletter_setup",
        section: "NZH:register"
      },
      "register/profile-setup/": {
        page_type: "NZH:profile_setup",
        name: "NZH:profile_setup",
        section: "NZH:register"
      },
      "profile/details/": {
        page_type: "NZH:profile_details",
        name: "NZH:profile_details",
        section: "NZH:profile"
      },
      "profile/newsletters/": {
        page_type: "NZH:profile_newsletters",
        name: "NZH:profile_newsletters",
        section: "NZH:profile"
      },
      "profile/my-newsletters/": {
        page_type: "NZH:profile_mynewsletters",
        name: "NZH:profile_mynewsletters",
        section: "NZH:profile"
      },
      "profile/subscriptions/payment/": {
        page_type: "NZH:profile_subscriptionspayment",
        name: "NZH:profile_subscriptionspayment",
        section: "NZH:profile"
      },
      "profile/subscriptions/payment-detail/": {
        page_type: "NZH:profile_paymentdetail",
        name: "NZH:profile_paymentdetail",
        section: "NZH:profile"
      },
      "profile/subscriptions/": {
        page_type: "NZH:profile_subscriptions",
        name: "NZH:profile_subscriptions",
        section: "NZH:profile"
      },
      "profile/": {
        page_type: "NZH:profile",
        name: "NZH:profile",
        section: "NZH:profile"
      },
      "forgot-password/": {
        page_type: "NZH:forgot_password",
        name: "NZH:forgot_password",
        section: "NZH:profile"
      },
      "reset-password/": {
        page_type: "NZH:reset_password",
        name: "NZH:reset_password",
        section: "NZH:profile"
      },
      "subscription/offers/": {
        page_type: "NZH:offer",
        name: "NZH:offer",
        section: "NZH:subscription"
      },
      "subscription/checkout/register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:subscription"
      },
      "subscription/checkout/sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:subscription"
      },
      "subscription/offers/sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:subscription"
      },
      "subscription/offers/register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:subscription"
      },
      "subscription/checkout/": {
        page_type: "NZH:your_details",
        name: "NZH:your_details",
        section: "NZH:subscription"
      },
      "subscription/payment/": {
        page_type: "NZH:payment",
        name: "NZH:payment",
        section: "NZH:subscription"
      },
      "subscription/confirmation/": {
        page_type: "NZH:confirmation",
        name: "NZH:confirmation",
        section: "NZH:subscription"
      }
    };
    for (var path in oProfile) {
      if (oProfile.hasOwnProperty(path)) {
        var page_val = "/my-account/" + path;
        if (window.location.pathname.indexOf("app") > -1) {
          page_val = "/app" + page_val;
        }
        if (page_path == page_val) {
          oPages.page_type = oProfile[path].page_type;
          oPages.name = oProfile[path].name;
          oPages.section = oProfile[path].section;
        }
      }
    }
    return oPages;
  };

  pub.getPlatform = function () {
    var platform = "desktop";
    if (window.location.pathname.indexOf("app") > -1) {
      platform = "app";
    }
    return platform;
  };

  pub.clickTag = function (clickVal, cookieName) {
    var sCookie = getDefaultVal(cookieName, "pv");
    setCookie(setCookieNodeVal(sCookie, clickVal));
  };

  pub.getPreviousVal = function (node) {
    // Read out the value
    var pv = getCookieNodeVal(node);
    // Clear the value
    setCookie(setCookieNodeVal(node, ""));

    // Remove cookie for '.www.nzherald.co.nz' domain which
    // which was conflicting with the cookie on 'www.nzherald.co.nz' domain
    // resulting in ref_page_element not being sent to comscore.
    // This can be remove eventually
    $utils.removeCookie("ga", { path: "/", domain: ".www.nzherald.co.nz" });

    return pv;
  };

  pub.initLocalStorage = function () {
    var trackingState = {
      arc_uuid: "",
      articles_read: "",
      content_type: "",
      createdAt: "",
      event: "vpv",
      name: "",
      navigation_state: "",
      page_type: "",
      platform: "",
      pp_name: "",
      pp_pagetype: "",
      pp_seconds: "",
      pp_section: "",
      ppv: "",
      product: "",
      publication: "",
      ref_page_element: "",
      section: "",
      sku: "",
      subscriber: "",
      visitor_id: "",
      meta: {
        react: false
      },
      virtualPageURL: "",
      virtualPageTitle: ""
    };
    window.localStorageWrapper.setItem("vpv", JSON.stringify(trackingState));
  };

  pub.writeToCookiesFromLocalStorage = function () {
    // coming out of react
    var ls = JSON.parse(window.localStorageWrapper.getItem("vpv"));
    $utils.cookie("ga", ls.ref_page_element);
    ls.meta.react = false;
    window.localStorageWrapper.setItem("vpv", JSON.stringify(ls));
  };

  pub.writeLocalStorage = function () {
    // going into react
    if (!document.querySelector(".coco-app")) {
      var trackingState = {
        arc_uuid: oParams.arc_uuid || "",
        articles_read: oParams.articles_read || "",
        content_type: oParams.content_type | "",
        createdAt: Math.round(new Date().getTime() / 1000),
        event: "vpv",
        name: oParams.name || "",
        navigation_state: oParams.navigation_state || "",
        page_type: oParams.page_type || "",
        page_label: "",
        platform: oParams.site_platform || "",
        product: oParams.product || "",
        publication: oParams.publication || "",
        ref_page_element: oParams.ref_page_element || "",
        section: oParams.section || "",
        sku: oParams.sku || "",
        subscriber: oParams.subscriber || "",
        syndicator: oParams.syndicator || "",
        visitor_id: oParams.visitor_id || "",
        meta: {
          react: false
        }
      };
      if (!window.localStorageWrapper.getItem("vpv")) {
        gtm.initLocalStorage();
      }
      window.localStorageWrapper.setItem("vpv", JSON.stringify(trackingState));
    }
  };

  // Private functions

  // Removes everything from a string that is not a numeric, alphanumeric or pipe character
  function getStrippedString(str) {
    return str.replace(/[^a-z0-9|]*/gi, "").toLowerCase();
  }

  // Coonverts an object into a string that looks like a url query string (params delimitered by & )
  function paramsToString(param) {
    param = getDefaultVal(param, aParams);
    return $utils.param(param);
  }

  // Set a default value for a function param that is not provided
  function getDefaultVal(param, defaultVal) {
    defaultVal = typeof defaultVal !== "undefined" ? defaultVal : "";
    param = typeof param !== "undefined" ? param : defaultVal;
    return param;
  }

  // Get the value for a particular node in the cookie data
  function getCookieNodeVal(node) {
    var oCsCookie = cookieToObject();
    var sReturn = "";
    if (oCsCookie.hasOwnProperty(node)) sReturn = oCsCookie[node];
    return sReturn;
  }

  // Add or Update a key value pair in the cs cookie
  function setCookieNodeVal(node, val) {
    var oCsCookie = cookieToObject();
    oCsCookie[node] = val;
    //console.log('oCsCookie');
    var sCookieVal = objectToCookie(oCsCookie);
    return sCookieVal;
  }

  // Write the cookie
  function setCookie(val) {
    // console.log(val);
    $utils.cookie("ga", val, { path: "/", expires: 365 });
  }

  // Convert the values in the ga cookie to an object
  function cookieToObject(name, delim) {
    name = getDefaultVal(name, "ga");
    delim = getDefaultVal(delim, "|");
    var oReturn = {};
    var csCookie = $utils.cookie(name);
    //console.log(csCookie);
    if (csCookie !== undefined && csCookie != "" && csCookie !== null) {
      aCookie = csCookie.split(delim);
      if (aCookie.length > 0) {
        for (var n in aCookie) {
          var aKeyVal = aCookie[n].split("=");
          oReturn[aKeyVal[0]] = aKeyVal[1];
        }
      }
    }
    return oReturn;
  }

  // Convert an object to a str that gets written to cookie
  function objectToCookie(obj) {
    var sCookieVal = "";
    for (var n in obj) {
      if (sCookieVal.length > 0) sCookieVal += "|";

      sCookieVal += n + "=" + obj[n];
    }
    return sCookieVal;
  }

  function update_mc(aCookie) {
    var currentDate = new Date();
    var i,
      new_mc,
      avg,
      ret = [];
    //a is a month:articlecount pair
    mc = aCookie[4];
    var a = mc.split(",");
    var total = 0;
    var total_days = 0;
    var count_30_day = 0;
    for (i = 0; i < a.length; ++i) {
      month_ct = a[i].split(":");
      days_in_month = new Date().monthDays(parseInt(month_ct[0]));
      //if this record is for current month
      if (month_ct[0] == cMonth) {
        month_ct[1]++;
        a[i] = month_ct.join(":");
        new_mc = a.join(",");
        days_in_month = currentDate.getDate();
      }

      total = total + parseInt(month_ct[1]);
      total_days = total_days + parseInt(days_in_month);
    }
    if (new_mc === "" || new_mc === undefined) {
      a[a.length] = cMonth + ":1";
      new_mc = a.join(",");
    }
    ret[0] = new_mc;
    //average
    ret[1] = Math.round(((365 / 12) * total) / total_days);
    return ret;
  }

  function getSegment(a) {
    var segment = "";
    if (a[0].split(",").length == 1) {
      var average = a[0].split(":")[1];
    } else {
      var average = a[1];
    }

    if (average <= 10) {
      segment = "light";
    } else if (average > 10 && average <= 24) {
      segment = "moderate";
    } else if (average > 24 && average < 100) {
      segment = "heavy";
    } else if (average > 100) {
      segment = "superheavy";
    }
    return segment;
  }

  // Increase the article read count
  function incrementArticleCount() {
    var aCookie = $utils.cookie("sessioncui").split("|");
    var a_mc = update_mc(aCookie);
    aCookie[3]++;
    aCookie[4] = a_mc[0];
    aCookie[5] = getSegment(a_mc);
    $utils.cookie("sessioncui", aCookie.join("|"), { path: "/", expires: 365 * 5 });
    //cs.customTrack({'sessioncui':aCookie[0],'days_remaining':aCookie[2],'articles_read':aCookie[3]});
    $utils.extend(oParams, {
      articles_read: aCookie[3]
    });
  }

  return pub;
})();

var isBlurred = false;
var pp_time = new Date().getTime();
var pp_blurtime = 0;
var pp_timer = 0;

window.onblur = function () {
  //if change windows stop counting engagement
  isBlurred = true;
  pp_blurtime = new Date().getTime();
  pp_timer = pp_timer + Math.floor((pp_blurtime - pp_time) / 1000);
};

window.onfocus = function () {
  //if change windows back counting engagement
  isBlurred = false;
  pp_time = new Date().getTime();
};

ga_.ppv_s = function (isUserAction) {
  var a,
    b,
    c,
    d,
    e = 0,
    f,
    g = Math,
    h = "max",
    i,
    j = document,
    k = window,
    m = 360, // NZME-1026 Threshold for max value of pp_seconds
    n = new Date().getTime(),
    contentID = "headlines";
  t = Math.floor((new Date().getTime() - pp_time) / 1000);

  a = Math["max"](
              Math["max"](document.body.scrollHeight, document.documentElement.scrollHeight),
              Math["max"](document.body.offsetHeight, document.documentElement.offsetHeight),
              Math["max"](document.body.clientHeight, document.documentElement.clientHeight)
  );
  b = window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop;
  c = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
  d = Math.round(((b + c) / a) * 100);
  d = d > 100 ? 100 : d;
  e = ga_.GetTimeLengthFromCookie("ga_ppv");
  i = e.split("|");

  if (t < 5) {
    e = d;
  } else {
    e = i[0];
    e = e > d ? e : d;
  }
  //If content pages get the objectid (Article/Gallery/Video)
  if (
    typeof oParams.objectid !== "undefined" &&
    (oParams.page_type == "NZH:article" ||
      oParams.page_type == "NZH:video" ||
      oParams.page_type == "NZH:imagegallery")
  ) {
    contentID = oParams.objectid;
  } else {
    //Other pages
    if (typeof oParams.section !== "undefined") {
      headlinesPage = oParams.section.split(":");
      if (typeof headlinesPage[1] !== "undefined") {
        contentID = headlinesPage[1].replace("-", "");
      }
    }
    //Setting the timer for the registration/profile/subscription pages
    if (
      oParams.section === "NZH:register" ||
      oParams.section === "NZH:profile" ||
      oParams.section === "NZH:subscription"
    ) {
      headlinesPage = oParams.name.split(":");
      if (typeof headlinesPage[1] !== "undefined") {
        contentID = headlinesPage[1].replace("-", "");
      }
    }
  }
  // Work out time viewed
  if (!isBlurred) {
    pp_timer = pp_timer + Math.floor((n - pp_time) / 1000);

    if (pp_timer > m) {
      pp_timer = m;
    }
  }
  if (isUserAction == "timer") {
    //write the pp_timer cookie
    if (contentID !== "") {
      ga_.setCookie(pp_timer, "ga_pp_timer_" + contentID);
    }
  } else {
    f =
      e +
      "|" +
      oParams["name"] +
      "|" +
      oParams["page_type"] +
      "|" +
      oParams["section"] +
      "|" +
      oParams["syndicator"];
    //oParams["syndicator"] != 'undefined' ? + '|' + oParams["syndicator"]: f;
    ga_.setCookie(f, "ga_ppv");
    ga_.setCookie(pp_timer, "ga_pp_timer_" + contentID);
  }
};

ga_.ppv_l = function (i) {
  var a,
    b = i ? i : 5,
    c = window;
  a = window.document.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener(
      "mousedown",
      function () {
        ga_.ppv_s(true);
      },
      false
    );
  }

  setInterval(function () {
    ga_.ppv_s("timer");
  }, b * 1000); // NZME-1026 Threshold pausing pp_seconds counter
  if (c.document.addEventListener) {
    c.document.addEventListener("load", ga_.ppv_s("timer"), false);
    c.document.addEventListener("scroll", ga_.ppv_s("timer"), false);
    c.document.addEventListener("resize", ga_.ppv_s("timer"), false);
    c.document.addEventListener("focus", ga_.ppv_s("timer"), false);
    c.document.addEventListener("blur", ga_.ppv_s("timer"), false);
  } else if (c.document.attachEvent) {
    c.document.attachEvent("onload", ga_.ppv_s("timer"));
    c.document.attachEvent("onscroll", ga_.ppv_s("timer"));
    c.document.attachEvent("onresize", ga_.ppv_s("timer"));
    c.document.attachEvent("onfocus", ga_.ppv_s("timer"));
    c.document.attachEvent("onblur", ga_.ppv_s("timer"));
  }
};



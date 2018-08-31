let restaurant;var map;window.initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})}),fetchRestaurantFromURL=(e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");t?DBHelper.fetchRestaurantById(t,(t,n)=>{self.restaurant=n,n?(fillRestaurantHTML(),e(null,n)):console.error(t)}):(error="No restaurant id in URL",e(error,null))}),featchRestuarantReviews=(e=>{DBHelper.featchRestuarantReviews(e).then(e=>{console.log(e),fillReviewsHTML(e)})}),fillRestaurantHTML=((e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;const t=document.getElementById("source-small"),n=document.getElementById("source-larg"),r=document.getElementById("restaurant-img");t.setAttribute("media","(max-width:470px)"),n.setAttribute("media","(min-width:471px)"),r.setAttribute("alt",`image from ${e.name} restaurant`),r.setAttribute("tabindex","0"),t.setAttribute("srcset",DBHelper.imgSetUrlForRestaurantSmall(e)),n.setAttribute("srcset",DBHelper.imgSetUrlForRestaurantLarg(e)),r.className="restaurant-img",r.src=DBHelper.imageUrlForRestaurant(e),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML();const a=getParameterByName("id");featchRestuarantReviews(a)}),fillRestaurantHoursHTML=((e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let n in e){const r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);const l=document.createElement("td");l.innerHTML=e[n],r.appendChild(l),t.appendChild(r)}}),fillReviewsHTML=((e=self.restaurant.reviews)=>{const t=document.getElementById("reviews-container");if(!t.querySelector("h2")){const e=document.createElement("h2");e.innerHTML="Reviews",t.appendChild(e)}if(!e){const e=document.createElement("p");return e.innerHTML="No reviews yet!",void t.appendChild(e)}const n=document.getElementById("reviews-list");e.reverse().forEach(e=>{n.appendChild(createReviewHTML(e))}),t.appendChild(n)}),createReviewHTML=(e=>{const t=document.createElement("li"),n=document.createElement("p");n.innerHTML=e.name,t.appendChild(n);const r=document.createElement("p");r.innerHTML=new Date(e.createdAt).toDateString(),t.appendChild(r);const a=document.createElement("p");a.innerHTML=`Rating: ${e.rating}`,t.appendChild(a);const l=document.createElement("p");if(l.innerHTML=e.comments,t.appendChild(l),!navigator.onLine){t.classList.add("reviews-offline");let e=document.createElement("div");e.innerHTML="Offline",e.id="offline-lable",t.appendChild(e)}return t}),fillBreadcrumb=((e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)}),getParameterByName=((e,t)=>{t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}),addReview=(()=>{const e={restaurant_id:getParameterByName("id"),name:document.getElementById("review-author").value,rating:document.querySelector("#review-rating option:checked").value,comments:document.getElementById("review-commnets").value,createdAt:new Date};DBHelper.addReview(e).then(()=>{const t=document.getElementById("reviews-container"),n=document.getElementById("reviews-list");n.insertBefore(createReviewHTML(e),n.firstChild),t.appendChild(n)}).catch(e=>{console.log(e),document.getElementById("reviews-list").appendChild(createReviewHTML(e.data))}),document.getElementById("restaurant-review").reset()});
import express from 'express'
import { PropertPost, ShowProperty, ShowPropertyByUsingParametar, ShowPropertyRent, ShowPropertyReport } from '../controllers/property.controller';
import { PropertyPicAdd } from '../controllers/property_pic.controller';
import { WishlistProperty } from '../controllers/wishlist.controller';
import { AtalsSearchingProrperty } from '../controllers/atlas_search.controller';


const routes =express.Router();
routes.post('/property/post',PropertPost)
routes.post('/property/pic-add',PropertyPicAdd)
routes.get('/property/show',ShowProperty)
routes.get('/property/status',ShowPropertyRent)
routes.post('/user/wishlist',WishlistProperty)
routes.post('/property/report',ShowPropertyReport)
routes.get('/property/sort',ShowPropertyByUsingParametar)
routes.get('/property/Search',AtalsSearchingProrperty)

export default routes;
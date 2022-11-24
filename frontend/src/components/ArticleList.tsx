import React, {useEffect} from 'react';
import { useAppDispatch } from '../app/hooks'
// import { getArticleList } from '../features/article/articleSlice';

export default function ArticleList() {


  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //     dispatch(getArticleList());
  // })
  
  // const DOMAIN = "http://localhost:8080/"
  // const readAllShareRequest: any = (method: string, url: string, data: object) => {
  //   return axios({
  //     method,
  //     url: DOMAIN + url,
  //     data: data
  //   })
  //     .then((res) =>{ 
      
  //     console.log(res.data)
  //   })
  //     .catch(err => {
  //       console.error(err.response.data)
  //     })
  // }
    return (
        <div>
          <h1>ArticleList</h1>
        </div>
        
    )
  }
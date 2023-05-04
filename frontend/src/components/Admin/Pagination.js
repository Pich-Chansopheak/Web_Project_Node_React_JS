import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({postsPerpage,totalPosts,paginate,currentPage}) => {
  const pageNumbers =[];
  const lastPage = Math.ceil(totalPosts/postsPerpage);
    for(let i =1;i<=lastPage;i++){
        pageNumbers.push(i);
    }
  if(pageNumbers.length != 1){
    return (
      <nav className='d-flex'>
         <ul className='pagination mx-auto'>
          <li class="page-item"><a style={{cursor:"pointer"}} onClick={currentPage>1?()=>paginate(currentPage-1):currentPage} className="page-link">Previous</a></li>
              {pageNumbers.map(number=>(
                  <li key={number} className={"page-item mb-3"}>
                      <Link onClick={()=>paginate(number)} className={'page-link '+(currentPage===number?'active':'')}>
                          {number} {/* let it display page number */}
                      </Link>
                  </li>
              ))}
          <li class="page-item"><a style={{cursor:"pointer"}} onClick={currentPage===lastPage? lastPage : ()=>paginate(currentPage+1)} className="page-link">Next</a></li>
         </ul>
      </nav>
    )
  }
  else{
    return(null);
  }
}

export default Pagination
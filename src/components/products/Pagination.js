import React from 'react'
import { Link } from "react-router-dom";


export default function Pagination({postsPerPage,totalPosts,paginate}) {
    const pageNumbers = []

    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <nav>
           <ul className="pagination">
                {pageNumbers.map(number=>(
                    <li key={number} className="page-item">
                        <Link className="page-link" onClick={()=>paginate(number)} >
                            {number}
                        </Link>
                    </li>
                ))}
           </ul>    
        </nav>
    )
}

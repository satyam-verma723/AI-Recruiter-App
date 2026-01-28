import React from 'react'

const QuestionListContainer = ({questionList}) => {
  return (
    <div>
        <div className='p-5 border border-gray-300 rounded-xl'>
                    {questionList.map((item,index)=>(
                        <div key={index} className='p-3 border border-gray-100 rounded-xl'>
                            <h2 className='font-medium'>{item.question}</h2>
                            <h2>Type:{item?.type}</h2>
                        </div>
                    ))}
                 </div>
    </div>
  )
}

export default QuestionListContainer
import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
const opts = {
  height: '300',
  width: '350',
  playerVars: {
    autoplay: 0,
  },
}
function ChapterContent({chapter,content}) {
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
      <p className='text-gray-500'>{chapter?.about}</p>
      <div className='flex justify-center my-6'>

      
      <YouTube
  videoId={content?.videoId}
  opts={opts} 
/>
      </div>
      <div>
        {
          content?.content?.map((item,index)=>(
            <div className='p-5 bg-slate-500 mb-3 rounded-lg'>
              <h2 className='font-medium text-lg'>{item.title}</h2>
              {/* <p className='whitespace-pre-wrap'>{item?.explanation}</p> */}
              <ReactMarkdown>{item?.explanation}</ReactMarkdown>
              
             {item.code &&  <div className='p-4 bg-black text-white rounded-md  mt-3 '>

              
              <pre className='overflow-x-scroll md:overflow-x-hidden'>
                <code className='text-wrap'>{item?.code.replace('<precode>', '').replace('</precode>','').replace('<pre>','').replace('</pre>','')}</code>
              </pre>
              </div>
          }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChapterContent

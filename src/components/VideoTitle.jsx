const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[10%] px-24 absolute text-white bg-linear-to-r from-black " >
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-6 text-lg w-1/4">{overview}</p>
        <div>
            <button className= " bg-white text-black p-4 px-10 text-xl rounded-lg hover:opacity-80">▶PLAY</button>
            <button className="mx-2 bg-gray-800 text-white p-4 px-10 text-xl rounded-lg">MORE INFO</button>
        </div>
    </div>
  )
}

export default VideoTitle
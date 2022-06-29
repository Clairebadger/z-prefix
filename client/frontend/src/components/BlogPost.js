
const MAX_LENGTH = 100;

const BlogPost = (props) => {

    return  (
        <>
            <div>{props.title}</div>
            <div>{props.username}</div>
            {
                props.content.length > MAX_LENGTH ?
                    <div>
                        {`${props.content.substring(0, MAX_LENGTH)}...`}
                    </div>
                :
                    <p>{props.content}</p>
            }
        </>
    )
}

export default BlogPost
<?php
require_once('dataBase/mysql.php');
/*
    Posts has retionship with users : 
    
    Each user can have multi posts and , but each post can only has one user
*/
class Posts {
    /* attributes */
    private $title , 
            $discription , 
            $status , 
            $userId ,
            $catId, 
            $message;

    /* Data base attributes */
    private $connectServer ,
            $result;

    /* Setter functions */
    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function setDiscription($discription)
    {
        $this->discription = $discription;
    }
    public function setStatus($status)
    {
        $this->status = $status;
    }
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

    /* Getter functions */
    public function getTitle()
    {
        return $this->title;
    }
    public function getDiscription()
    {
        return $this->discription;
    }
    public function getStatus()
    {
        return $this->status;
    }
    public function getMessage()
    {
        return $this->message;
    }
    public function getCatId()
    {
        return $this->catId;
    }


    /* Constructor */
    function __construct()
    {
        $this->connectServer = new ConnectMysql();
    }

    /* Get user's ID */
    private function getUserId()
    {
        $this->userId = isset($_COOKIE['id']) ? $_COOKIE['id']  : null;
    }

    /* Set  new post */
    public function newPost($catID)
    {
     
            $query = "insert ";
            $query .= "INTO posts ( ";
            $query .= "title , discription , status , cat_id , user_id ";
            $query .=") VALUES ( ";
            $query .="'{$this->title}' , '{$this->discription}' , '{$this->status}' , {$catID} , {$this->userId} ";
            $query .=" ) ";

            $this->result = mysqli_query($this->connectServer->getConnection() , $query);
           if(!$this->result) {
               $this->message="Woops! we have problem in our query in new post()";
           } else {
               $this->message = "Successfull , Your post saved.";
           }
       
    } 

    /* Update post */
    public function updatePost($postID , $catID)
    {
        
        $query = "update posts ";
        $query .= "set title = '{$this->title}' , discription = '{$this->discription}'  , status = '{$this->status}' , cat_id = {$catID} ";
        $query .="where id = {$postID} AND user_id = {$this->userId} ";

        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }

    /* Delete post */
    public function deletePost($postID)
    {
        $query = "delete from posts ";
        $query .="where id = {$postID} AND user_id = {$this->userId} ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);
        $this->message = $this->connectServer->checkResult($this->result);
    }
    

    /* Get all posts */
    public function allPosts()
    {
        $postData = array();

        $query = "select * from posts ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result)
        {
            while($row = mysqli_fetch_assoc($this->result))
            {
                $postData = [array(
                    'post_id' => $row['id'] , 
                    'post_title' => $row['title'] , 
                    'post_discription' => $row['discription'] , 
                    'post_status' => $row['status'] , 
                    'post_cat_id' => $row['cat_id']

                )];
                
            }

            echo json_encode($postData);
        }
        else 
        {
            $this->message = "Woops!We have some problem in show data.(allPosts)";
            echo json_encode($this->message);
        }

    }


    /* Get post by ID */
    public function getPostByID($postID)
    {
        $postData = array();

        $query = "select * from posts ";
        $query .= "where id = {$postID} ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result)
        {
            while($row = mysqli_fetch_assoc($this->result))
            {
                $postData = array(
                    'post_id' => $row['id'] , 
                    'post_title' => $row['title'] , 
                    'post_discription' => $row['discription'] , 
                    'post_status' => $row['status'] , 
                    'post_cat_id' => $row['cat_id']

                );
                $this->catId = $row['cat_id'];
            }

            echo json_encode($postData);
        }
        else 
        {
            $this->message = "Woops!We have some problem in show data.(allPosts)";
            echo json_encode($this->message);
        }

    }


    /* Get user's post(s) */
    public function getUserPost()
    {
        $postData = array();

        $query = "select * from posts ";
        $query .= "where user_id = {$this->userId} ";
        $this->result = mysqli_query($this->connectServer->getConnection() , $query);

        if($this->result)
        {
            while($row = mysqli_fetch_assoc($this->result))
            {
                $postData[] = array(
                    'post_id' => $row['id'] , 
                    'post_title' => $row['title'] , 
                    'post_discription' => $row['discription'] , 
                    'post_status' => $row['status'] , 
                    'post_cat_id' => $row['cat_id']

                );
                $this->catId = $row['cat_id'];
            }

            echo json_encode($postData);
        }
        else 
        {
            $this->message = "Woops!We have some problem in show data.(alluserPosts)";
            echo json_encode($this->message);
        }

    }
}
?>
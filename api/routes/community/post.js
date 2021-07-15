***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***

// post portfolio as a new post (if not already exists) on community page
router.post('/api/portfolio/post'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    var post = await Post.findOne({user: id***REMOVED***.exec();

    if(post) {
        throw new BadRequestError('Already posted...'***REMOVED*** 400);
***REMOVED***

    post = new Post({
        user: id
***REMOVED***);

    post = await post.save();

    res.status(201).json({post***REMOVED***
    
***REMOVED***

router.put("/api/post/like/:postId"***REMOVED*** 
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
        var result = await Post.updateOne(
***REMOVED***
                _id: postId***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
            result = await Post.updateOne(
    ***REMOVED***
                    _id: postId
    ***REMOVED***
    ***REMOVED***
    ***REMOVED***
***REMOVED***
        ***REMOVED***
***REMOVED***
***REMOVED***
    ***REMOVED***
***REMOVED***
    ***REMOVED***
            return res.status(200).json({likes: -1***REMOVED***
    ***REMOVED***

        res.status(200).json({likes: 1***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

    
***REMOVED***

router.get('/api/post/get'***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

    console.log(userId);

***REMOVED***
        var posts = await Post
                .aggregate([
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
                            from: 'users'***REMOVED***
                            localField: 'user'***REMOVED***
        ***REMOVED***
                            as: 'user'
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
                        $unwind: "$user"
        ***REMOVED***

        ***REMOVED***
        ***REMOVED***
                            'desc': "$user.portfolio.about.desc"***REMOVED***
                            'img_url': "$user.portfolio.about.img_url"
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
        ***REMOVED***
                            "user.email": 0***REMOVED***
                            "user.password": 0***REMOVED***
                            "user.portfolio": 0***REMOVED***
        ***REMOVED***
        ***REMOVED***
                ])
                .exec();
                
        res.status(200).json({posts***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
        throw new BadRequestError('Unable to fetch posts');
***REMOVED***
***REMOVED***

***REMOVED***
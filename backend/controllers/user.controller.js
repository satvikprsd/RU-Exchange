import { User } from "../models/user.model";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if(!name ||!email ||!password ||!phone) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            name, 
            email, 
            password:hashedPassword, 
            phone 
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profilePic: user.profilePic,
            wishlist: user.wishlist,
            favourites: user.favourites,
            cart: user.cart,
            orders: user.orders,
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000 }).json({
            success: true,
            message: `${user.name}, logged in successfully`,
            user: userData,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error });
    }
};

export const logout = async(req,res) => {
    try {
        res.clearCookie('token', { path: '/' });
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};

export const getWishlist = async (req, res) => {
    const userID = req._id;
    try{
        const user = await User.findById(userID).populate('wishlist');
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({success: true, wishlist: user.wishlist });
    }catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: e });
    }
}

export const getCart = async (req, res) => {
    const userID = req._id;
    try{
        const user = await User.findById(userID).populate('cart');
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ success: true, cart: user.cart });
    }catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: e });
    }
}

export const getOrders = async (req, res) => {
    const userID = req._id;
    try{
        const user = await User.findById(userID).populate('orders');
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ success: true, orders: user.orders });
    }catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: e });
    }
}

export const getRequests = async (req, res) => {
    const userID = req._id;
    try{
        const user = await User.findById(userID).populate([{path: 'user', select:'-password'}, {path: 'item'}])
        res.status(200).json({ success: true, requests: user.requests });
    }catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: e });
    }
}

export const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req._id).select('-password');
        if(!user) return res.status(404).json({ uccess: false,message: 'User not found' });
        res.status(200).json({ success: true, user });
    }
    catch(e){
        console.error(e);
        res.status(500).json({ success: false, message: e });
    }
}

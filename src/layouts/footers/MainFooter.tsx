const MainFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">Company Name</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum cursus.</p>
                    </div>
                    <div className="w-full md:w-1/4 mt-4 md:mt-0">
                        <h3 className="text-lg font-semibold mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mt-4 md:mt-0">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <ul className="flex space-x-4">
                            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mt-4 md:mt-0">
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <p>123 Street Name, City</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default MainFooter;
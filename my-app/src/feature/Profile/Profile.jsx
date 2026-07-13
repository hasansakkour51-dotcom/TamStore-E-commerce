import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import {
  FaHeart,
  FaTrash,
  FaEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Swal from "sweetalert2";

import "./Profile.css";
import { WishlistContext } from "../../contextWishlist/WishlistContext";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";

const Profile = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  const [profile, setProfile] = useState({
    name: "Hasan",
    email: "hasan@example.com",
    phone: "+963 999 999 999",
    image: null,
  });

  const [loadingImage, setLoadingImage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpload = (e) => {
    setLoadingImage(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
      setLoadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowEditModal(false);
    Swal.fire({
      title: "Profile Updated!",
      text: "✅ Your profile has been updated successfully.",
      icon: "success",
      confirmButtonColor: "#0d6efd",
    });
  };

  const handleDelete = () => {
    setProfile({ name: "", email: "", phone: "", image: null });
    setShowDeleteModal(false);
    Swal.fire({
      title: "Profile Deleted!",
      text: "❌ Your profile has been removed.",
      icon: "error",
      confirmButtonColor: "#dc3545",
    });
  };

  return (
    <>
      <Header />
      <section className="profileSection">
        <Container>
          <Row>
            {/* Sidebar */}
            <Col lg={4} md={12} className="profileSidebar pb-5">
              <Card className="profileCard">
                <Card.Body className="text-center">
                  <div className="profileImageContainer">
                    {loadingImage ? (
                      <Skeleton circle={true} height={120} width={120} />
                    ) : profile.image ? (
                      <img
                        src={profile.image}
                        alt="Profile"
                        className="profileImage"
                      />
                    ) : (
                      <Skeleton circle={true} height={120} width={120} />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="uploadInput"
                    />
                  </div>

                  <h4>
                    <FaUser /> {profile.name || "No Name"}
                  </h4>
                  <p>
                    <FaEnvelope /> {profile.email || "No Email"}
                  </p>
                  <p>
                    <FaPhoneAlt /> {profile.phone || "No Phone"}
                  </p>

                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <Button
                      variant="primary"
                      onClick={() => setShowEditModal(true)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>

                  <Button
                    variant="outline-danger"
                    className="logoutBtn mt-3 w-100"
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      Swal.fire({
                        title: "Logged Out",
                        text: "🔴 You have been logged out.",
                        icon: "info",
                        confirmButtonColor: "#0d6efd",
                      }).then(() => {
                        window.location.href = "/authForm";
                      });
                    }}
                  >
                    🔴 Logout
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Wishlist */}
            <Col lg={8} md={12} className="wishlistSection">
              <h3>
                <FaHeart /> My Wishlist
              </h3>
              {wishlist.length === 0 ? (
                <p className="noResults">No items in wishlist.</p>
              ) : (
                <Row className="wishlistItems">
                  {wishlist.map((item) => (
                    <Col md={6} key={item.id}>
                      <Card className="wishlistItem">
                        <Card.Img
                          variant="top"
                          src={item.thumbnail}
                          className="wishlistImg"
                        />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>${item.price}</Card.Text>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <FaTrash /> Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        backdropClassName="blurBackdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEdit /> Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdropClassName="blurBackdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaTrash /> Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your profile?</p>
          <Button variant="danger" onClick={handleDelete} className="me-2">
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default Profile;

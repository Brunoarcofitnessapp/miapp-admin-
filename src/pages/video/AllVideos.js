import React, { useState } from "react";
import { Row, Col } from "antd";
import { useEffect } from "react";
import { deletevideo, getVideos } from "../../api";
import { toast, Toaster } from "react-hot-toast";
import { useAdmin } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CommonButton } from "../../components/Buttons";

const AllVideos = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const [loading, setloading] = useState(true);
  const [deleteloading, setdeleteloading] = useState(false);
  const [fetchagain, setfetchagain] = useState(false);

  const [chestvids, setchestvids] = useState([]);
  const [absvids, setabsvids] = useState([]);
  const [biceps, setbiceps] = useState([]);
  const [triceps, settriceps] = useState([]);
  const [legs, setlegs] = useState([]);
  const [shoulders, setshoulders] = useState([]);
  const [back, setback] = useState([]);

  const { videos, setvideos } = useAdmin();

  useEffect(() => {
    getVideos(setloading, setvideos, toast);
  }, [fetchagain]);

  const deletevid = (id, publicid) => {
    deletevideo(
      setdeleteloading,
      id,
      publicid,
      fetchagain,
      setfetchagain,
      toast
    );
  };

  useEffect(() => {
    if (videos) {
      setchestvids(videos.filter((vid) => vid.type === "chest"));
      setabsvids(videos.filter((vid) => vid.type === "abs"));
      setbiceps(videos.filter((vid) => vid.type === "biceps"));
      settriceps(videos.filter((vid) => vid.type === "triceps"));
      setlegs(videos.filter((vid) => vid.type === "legs"));
      setshoulders(videos.filter((vid) => vid.type === "shoulders"));
      setback(videos.filter((vid) => vid.type === "back"));
    }
  }, [videos]);

  return (
    <>
      <Toaster position="top-right" />
      {loading ? (
        <Row gutter={[24, 24]}>
          <Col
            span={24}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: 35,
            }}
          >
            <div className="basic"></div>
          </Col>
        </Row>
      ) : (
        <>
          {videos && videos.length > 0 && (
            <>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>Cofre</h1>
              </Row>
              <Row gutter={[24, 24]}>
                {chestvids.length > 0 ? (
                  chestvids?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>
                  Abdominales
                </h1>
              </Row>
              <Row gutter={[24, 24]}>
                {absvids.length > 0 ? (
                  absvids?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>
                  Biceps
                </h1>
              </Row>
              <Row gutter={[24, 24]}>
                {biceps.length > 0 ? (
                  biceps?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>
                  Triceps
                </h1>
              </Row>
              <Row gutter={[24, 24]}>
                {triceps.length > 0 ? (
                  triceps?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>
                  Piernas
                </h1>
              </Row>
              <Row gutter={[24, 24]}>
                {legs.length > 0 ? (
                  legs?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>
                  Hombros
                </h1>
              </Row>
              <Row gutter={[24, 24]}>
                {shoulders.length > 0 ? (
                  shoulders?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
              <Row gutter={[24, 24]}>
                <h1 style={{ padding: "4px 18px", fontSize: "22px" }}>atrás</h1>
              </Row>
              <Row gutter={[24, 24]}>
                {back.length > 0 ? (
                  back?.map((video, index) => {
                    return (
                      <Col span={8}>
                        <div
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "var(--color-bg)",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <video
                            style={{
                              borderRadius: 10,
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            width="100%"
                            height={250}
                            controls
                            muted
                            src={video?.video}
                          />
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--color-primary)",
                              textAlign: "center",
                            }}
                          >
                            {video?.title}
                          </p>
                          <CommonButton
                            title={"Borrar"}
                            onClick={() => deletevid(video._id, video.publicid)}
                            style={{
                              marginTop: 5,
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                            loading={deleteloading}
                          />
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Row gutter={[5, 5]}>
                    <h1 style={{ padding: "4px 18px", fontSize: "16px" }}>
                      No hay videos relacionados con esta sección
                    </h1>
                  </Row>
                )}
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AllVideos;

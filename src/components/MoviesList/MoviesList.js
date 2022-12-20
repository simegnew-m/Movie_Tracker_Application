import { useState, useEffect, Fragment } from "react";
import { db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import EditMovie from "../EditMovie/EditMovie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  withRouter,
} from "react-router-dom";
import { Table, Tooltip, Button } from "antd";
import { EditTwoTone, DeleteOutlined } from "@ant-design/icons";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const navigate = useNavigate();

  const handleDelete = async (docID) => {
    try {
      await deleteDoc(doc(db, "movies", docID));
      console.log("record deleted");
      // update your state or anything you want to do after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await getDocs(moviesCollectionRef);
      // console.log(data);
      setMovies(
        data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          no: index + 1,
        }))
      );
    };
    getMovies();
  }, [refresh]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Watch Date",
      dataIndex: "date",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Actions",
      dataIndex: "id",
      fixed: "right",
      render: (id) => {
        return (
          <div style={{ marginLeft: "30px" }}>
            <Tooltip placement="top" title={"Edit Movie"}>
              <Button
                style={{ marginRight: "20px" }}
                type="text"
                icon={<EditTwoTone />}
                onClick={() => {
                  navigate(`/edit-movie/${id}`);
                }}
              ></Button>
            </Tooltip>

            <Tooltip placement="top" title={"Delete Movie"}>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDelete(id);
                  setRefresh(!refresh);
                }}
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  console.log("first", movies);
  return (
    <div style={{ width: "90%", marginLeft: "5%", marginTop: "5%" }}>
      <div>
        <h1 style={{ marginLeft: "40%", marginBottom: "20px" }}>Movie List</h1>
      </div>
      <Table style={{}} dataSource={movies} columns={columns} />
    </div>
  )
}

export default MoviesList;

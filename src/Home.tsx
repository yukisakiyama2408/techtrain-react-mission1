import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useAuth } from "./Contexts/AuthContext";

const Home = () => {
  const { accessToken } = useAuth();
  const isSignedIn = accessToken != null;
  return (
    <div className="home">
      <div className="home-box">
        {/* <h2>このアプリについて</h2>
        <p>
          このアプリはユーザーの皆さんが読んだ本のレビューを登録したり、他の人のレビューを読んだりできます。
        </p>
        <p>是非読んだ本の記録や気になる本を探す際にご利用ください。</p> */}
        {isSignedIn && (
          <div className="signin-box">
            <div>
              <h2>Book Reveiw</h2>
            </div>
            <div className="home-index-box">
              <p>書籍レビュー一覧はこちら</p>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/book-index"
                className="home-index-btn"
              >
                書籍レビュー
              </Button>
            </div>
            <div className="home-new-box">
              <p>書籍レビューを登録する</p>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/new"
                className="home-new-btn"
              >
                レビューを登録
              </Button>
            </div>
          </div>
        )}
        {!isSignedIn && (
          <div className="signout-box">
            <div>
              <h2>Book Reveiw</h2>
            </div>
            <div className="home-signup-box">
              <p>初めての方はこちら</p>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/signup"
                className="home-signup-btn"
              >
                新規登録
              </Button>
            </div>
            <div className="home-login-box">
              <p>ユーザーの方はこちら</p>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/login"
                className="home-login-btn"
              >
                ログイン
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

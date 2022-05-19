import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <div>
      <h1>Book Reveiw</h1>
      <h2>このアプリについて</h2>
      <p>
        このアプリはユーザーの皆さんが読んだ本のレビューを登録したり、他の人のレビューを読んだりできます。是非読んだ本の記録や気になる本を探す際にご利用ください。
      </p>
      <div>
        <p>初めての方は</p>
        <Button variant="contained" component={Link} to="/signup">
          新規登録
        </Button>
      </div>
      <div>
        <p>ユーザーの方はこちら</p>
        <Button variant="contained" component={Link} to="/login">
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default Home;

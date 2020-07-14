import React from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";

const MostViewed = (props) => {
  let prods = props.products
    .sort((a, b) => (a.views < b.views ? 1 : -1))
    .slice(0, 3);
  const data = {
    labels: prods.map((p) => p.name),
    datasets: [
      {
        label: "Most Viewed Product",
        data: prods.map((p) => p.views),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 262,235,1)",
        ],
      },
    ],
  };
  const options = {
    //   title : {
    //       display : true,
    //       text : 'Top 3 Product'
    //   },
    legend: {
      labels: {
        fontColor: "white",
      },
    },
  };
  return (
    <div style={{ minHeight: "100vh", paddingBottom: "30px" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "30px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Top 3 Viewed Products
      </h1>
      <Doughnut data={data} options={options} />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
  };
}
export default connect(mapStateToProps)(MostViewed);

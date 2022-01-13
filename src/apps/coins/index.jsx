import { API } from "aws-amplify";
import { useState } from "react";

let numFormatter = new Intl.NumberFormat('en-US')

export default function CoinsApp() {
  let [coins, updateCoins] = useState([]);
  let [input, updateInput] = useState({
    start: 0,
    limit: 5,
  });
  let [loading, setLoading] = useState(false);

  async function fetchCoins() {
    try {
      setLoading(true);
      let { start, limit } = input;
      const data = await API.get(
        "cryptoapi",
        `/coins?start=${start}&limit=${limit}`
      );
      updateCoins(data.coins);
    } catch (err) {
      //
      console.log('err:',err)
    } finally {
      setLoading(false);
    }
  }

  let updateInputValues = (field, value) =>
    updateInput((v) => ({ ...v, [field]: value }));


  return (
    <div>
      {/* user input */}
      <label>
        Start:
        <input
          type="number"
          placeholder="start"
          value={input.start}
          onChange={(e) => updateInputValues("start", e.target.values)}
        />
      </label>
      <label>
        Limit:
        <input
          type="number"
          placeholder="limit"
          value={input.limit}
          onChange={(e) => updateInputValues("limit", e.target.value)}
        />
      </label>
      <button onClick={fetchCoins}>fetch coins</button>

      {/* coins */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <ul>
          {coins.map((coin) => {
            return (
              <li key={coin.name}>
                <h3>
                  {coin.name} - {coin.symbol}
                </h3>
                <h5>${numFormatter.format(coin.price_usd)}</h5>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState([
    {
      id: 1,
      category: "Allowance",
      amount: 800,
      date: "2026-11-01",
      description: "Monthly stipend",
    },
    {
      id: 2,
      category: "Freelance",
      amount: 2200,
      date: "2026-11-06",
      description: "UI Design for Client",
    },
    {
      id: 3,
      category: "Gift",
      amount: 350,
      date: "2026-11-09",
      description: "Birthday Cash",
    },
  ]);

  const [category, setCategory] = useState("Allowance");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!amount || !date) return;

    const newEntry = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      date,
      description: description || "No description",
    };

    setEntries([newEntry, ...entries]);
    setAmount("");
    setDate("");
    setDescription("");
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const filteredEntries =
    filterCategory === "All"
      ? entries
      : entries.filter((entry) => entry.category === filterCategory);

  const totalIncome = filteredEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.mainWrapper}>
        <header style={styles.headerBar}>
          <div style={styles.titleCard}>
            <h1 style={styles.mainTitle}>Income Category Ledger</h1>
            <p style={styles.subTitle}> Made by Francine Jaian C. Fernandes</p>
          </div>

          <div style={styles.headerStatsCard}>
            <div style={styles.statCol}>
              <span style={styles.statLabel}>TOTAL INCOME</span>
              <span style={styles.statValue}>
                ₱
                {totalIncome.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statCol}>
              <span style={styles.statLabel}>TOTAL RECORDS</span>
              <span style={styles.statValueCount}>
                {filteredEntries.length}
              </span>
            </div>
          </div>
        </header>

        <div style={styles.contentGrid}>
          {/* Add Entry Form */}
          <section style={styles.formCard}>
            <h2 style={styles.cardHeaderTitle}>Add Transaction</h2>
            <form onSubmit={handleAddEntry} style={styles.formStack}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="Allowance">Allowance</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Gift">Gift</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>AMOUNT (₱)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  style={styles.textInput}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  style={styles.textInput}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>DESCRIPTION</label>
                <input
                  type="text"
                  placeholder="Enter details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={styles.textInput}
                />
              </div>

              <button type="submit" style={styles.submitBtn}>
                + Add Entry
              </button>
            </form>
          </section>

          {/* Transaction Table */}
          <section style={styles.tableCard}>
            <div style={styles.tableHeaderRow}>
              <div style={styles.titleWithIcon}>
                <span style={styles.iconBox}>📚</span>
                <h2 style={styles.historyTitle}>Transaction History</h2>
              </div>

              <div style={styles.filterControls}>
                <span style={styles.filterIcon}>⚙ Filter:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={styles.filterPillSelect}
                >
                  <option value="All">All Categories</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Gift">Gift</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thHeadRow}>
                    <th style={styles.th}>DATE</th>
                    <th style={styles.th}>CATEGORY</th>
                    <th style={styles.th}>DESCRIPTION</th>
                    <th style={styles.th}>AMOUNT</th>
                    <th style={{ ...styles.th, textAlign: "center" }}>
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={styles.emptyCell}>
                        No transaction entries found.
                      </td>
                    </tr>
                  ) : (
                    filteredEntries.map((entry) => (
                      <tr key={entry.id} style={styles.trDashedRow}>
                        <td style={styles.tdDate}>{entry.date}</td>
                        <td style={styles.td}>
                          <span style={styles.categoryPill}>
                            {entry.category}
                          </span>
                        </td>
                        <td style={styles.tdDesc}>{entry.description}</td>
                        <td style={styles.tdAmount}>
                          ₱{entry.amount.toFixed(2)}
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            style={styles.pinkDeleteBtn}
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#ffb3d9",
    backgroundImage: `
      radial-gradient(at 0% 0%, #ff80bf 0px, transparent 50%),
      radial-gradient(at 100% 0%, #ff66b2 0px, transparent 50%),
      radial-gradient(at 100% 100%, #ff99cc 0px, transparent 50%),
      radial-gradient(at 0% 100%, #ff4da6 0px, transparent 50%)
    `,
    fontFamily: '"Quicksand", sans-serif',
    color: "#800040",
    padding: "36px 20px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(255, 255, 255, 0.35)",
    borderRadius: "50%",
    top: "-80px",
    left: "-80px",
    filter: "blur(50px)",
    zIndex: 1,
  },
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(255, 26, 140, 0.25)",
    borderRadius: "50%",
    bottom: "-100px",
    right: "-100px",
    filter: "blur(60px)",
    zIndex: 1,
  },
  mainWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  headerBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "28px",
  },
  titleCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "20px",
    padding: "20px 24px",
    border: "2px solid #ffb6c1",
    boxShadow: "0 8px 20px rgba(216, 27, 96, 0.12)",
    flex: "1",
    minWidth: "280px",
  },
  mainTitle: {
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#800040",
    margin: 0,
    lineHeight: 1.1,
  },
  subTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#d81b60",
    margin: "4px 0 0",
  },
  headerStatsCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    border: "2px solid #ffb6c1",
    borderRadius: "20px",
    padding: "16px 28px",
    boxShadow: "0 8px 20px rgba(216, 27, 96, 0.12)",
  },
  statCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statLabel: {
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#d81b60",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#ff007f",
  },
  statValueCount: {
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "1.6rem",
    fontWeight: "700",
    color: "#a00050",
  },
  statDivider: {
    width: "1px",
    height: "34px",
    backgroundColor: "#ffb6c1",
    margin: "0 20px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
  },
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "20px",
    padding: "22px",
    border: "2px solid #ffb6c1",
    boxShadow: "0 8px 20px rgba(216, 27, 96, 0.12)",
    height: "fit-content",
  },
  cardHeaderTitle: {
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "1.25rem",
    color: "#a00050",
    margin: "0 0 16px",
  },
  formStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#d81b60",
  },
  selectInput: {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "2px solid #ffb6c1",
    backgroundColor: "#fff0f5",
    color: "#800040",
    fontSize: "0.9rem",
    fontWeight: "700",
    outline: "none",
  },
  textInput: {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "2px solid #ffb6c1",
    backgroundColor: "#fff0f5",
    color: "#800040",
    fontSize: "0.9rem",
    fontWeight: "700",
    outline: "none",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#ff007f",
    color: "#ffffff",
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(255, 0, 127, 0.3)",
  },
  tableCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "20px",
    padding: "24px",
    border: "2px solid #ffb6c1",
    boxShadow: "0 8px 20px rgba(216, 27, 96, 0.12)",
  },
  tableHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  titleWithIcon: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconBox: {
    fontSize: "1.3rem",
  },
  historyTitle: {
    fontFamily: '"Fredoka", sans-serif',
    fontSize: "1.4rem",
    color: "#500028",
    margin: 0,
  },
  filterControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterIcon: {
    fontSize: "0.85rem",
    fontWeight: "800",
    color: "#d81b60",
  },
  filterPillSelect: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "2px solid #ffb6c1",
    backgroundColor: "#fff0f5",
    color: "#d81b60",
    fontSize: "0.85rem",
    fontWeight: "800",
    outline: "none",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thHeadRow: {
    backgroundColor: "#ffe4ec",
  },
  th: {
    padding: "12px 10px",
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#ff007f",
    textAlign: "left",
    letterSpacing: "0.5px",
  },
  trDashedRow: {
    borderBottom: "2px dashed #ffc0cb",
  },
  td: {
    padding: "14px 10px",
    fontSize: "0.9rem",
  },
  tdDate: {
    padding: "14px 10px",
    fontSize: "0.85rem",
    fontWeight: "800",
    color: "#600030",
  },
  tdDesc: {
    padding: "14px 10px",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#600030",
  },
  tdAmount: {
    fontFamily: '"Fredoka", sans-serif',
    padding: "14px 10px",
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#ff007f",
  },
  categoryPill: {
    fontFamily: '"Fredoka", sans-serif',
    backgroundColor: "#ff69b4",
    color: "#ffffff",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "inline-block",
  },
  pinkDeleteBtn: {
    fontFamily: '"Fredoka", sans-serif',
    backgroundColor: "#ff1493",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "16px",
    fontSize: "0.85rem",
    cursor: "pointer",
    boxShadow: "0 3px 0px #c71585",
  },
  emptyCell: {
    textAlign: "center",
    padding: "24px",
    color: "#d81b60",
    fontWeight: "700",
  },
};

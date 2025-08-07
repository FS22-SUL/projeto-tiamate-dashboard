import * as XLSX from "xlsx"
import { useState, useContext, useEffect } from "react"
import { AntContext } from "../contexts/AntContext"
import { Button, Popconfirm, Table } from "antd"
import { DeleteFilled } from "@ant-design/icons"
import { AXIOS } from "../services"

const Leads = () => {
  const { api } = useContext(AntContext)
  const [leads, setLeads] = useState([])

  // COLUNAS DA TABELA
  const colunas = [
    {
      title: "Nome",
      dataIndex: "lead_nome",
      key: "lead_nome",
      width: "21%",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "lead_email",
      key: "lead_email",
      width: "25%",
      ellipsis: true,
    },
    {
      title: "Telefone",
      dataIndex: "lead_telefone",
      key: "lead_telefone",
      width: "15%",
      ellipsis: true,
      render: (text) => (
        <span>{text ? text.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") : ""}</span>
      ),
    },
    {
      title: "Cidade",
      dataIndex: "lead_cidade",
      key: "lead_cidade",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Estado",
      dataIndex: "lead_estado",
      key: "lead_estado",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Mídia",
      dataIndex: "lead_midia",
      key: "lead_midia",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Opções",
      key: "x",
      width: "9%",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center h-full">
          <Popconfirm
            title="Deseja excluir?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => handleDelete(record.lead_id)}
          >
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer duration-150 border border-transparent rounded-full hover:border-marrom group">
              <DeleteFilled className="duration-150 !text-bege group-hover:!text-marrom" />
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ]

  // EXPORTAR EXCEL
  function exportToExcel() {
    const dataToExport = leads.map(({ key, ...rest }) => rest)
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads")
    XLSX.writeFile(workbook, "leads.xlsx")
  }

  // DELETAR
  async function handleDelete(id) {
    let request = await AXIOS.delete(`/leads/${id}`);
    api[request.data.type]({
      description: request.data.description,
    })
    setTimeout(() => {
      getLeads();
    }, 2000)
  }

  async function getLeads(){
    let request = await AXIOS.get("/leads");
    if(request.data){
      setLeads(request.data);
    }
  }

  // BUSCAR LEADS
  useEffect(() => {
    // fetch("http://localhost:3001/Leads")
    // fetch("https://projeto-tiamate-back.onrender.com/leads")
    //   .then(res => res.json())
    //   .then(data => setLeads(data))
    getLeads();
  }, [])
  return ( 
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg text-bege font-bold">Leads</h1>
          <Button
            type="primary"
            onClick={exportToExcel}
          >
            Exportar Excel
          </Button>
        </div>
        <Table
          rowKey={"lead_id"}
          dataSource={leads}
          columns={colunas}
        />
      </div>
    </>
  );
}

export default Leads;
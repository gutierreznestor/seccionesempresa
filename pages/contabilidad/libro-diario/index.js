import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import { useSelectLibroDiario } from '../../../selectors/useSelectLibroDiario';
import useLibroDiario from '../../../customHooks/useLibroDiario';
import Form from '../../../components/Form/Form.component';
import Button from '../../../components/Button/Button.component';
import { formatDate } from '../../../helpers/dates';
import AsientoLibroDiario from '../../../components/AsientoLibroDiario/AsientoLibroDiario.component';
import Contabilidad from '../../../components/Contabilidad/Contabilidad.component';
import useContabilidad from '../../../customHooks/useContabilidad';
import ListItem from '../../../components/ListItem';
import TotalDebeHaberDiv from './LibroDiario.styled';
import BalanceDiv, { DesdeHastaDiv } from '../balance/Balance.styled';
import Heading from '../../../components/Heading/Heading.component';
import { format } from '../balance';
import usePrinter from '../../../customHooks/usePrinter';

const LibroDiarioForm = [
  {
    label: 'Hasta fecha',
    type: 'date',
    name: 'Fecha',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const LibroDiario = ({ user, db }) => {

  const { errorMessage, libroDiario } = useSelectLibroDiario();
  const { fetchLibroDiario, registrarLibroDiario } = useLibroDiario({ db });
  const { loading, TotalDebe, TotalHaber } = useSelectLibroDiario()
  const [Fecha, setFecha] = React.useState(null);
  const [showButton, setShowButton] = React.useState(false);
  const { handlers: { fetchContabilidad } } = useContabilidad({ db });
  const { ref, PrintButton } = usePrinter({ documentTitle: 'Libro diario' });

  React.useEffect(() => {
    fetchContabilidad();
  }, []);

  const onSubmit = (data) => {
    fetchLibroDiario(data);
    setFecha(data.Fecha);
    setShowButton(true);
  }

  const registerLibroDiario = () => {
    const message = `¿Generar libro diario con fecha ${formatDate({
      date: Fecha,
      formatString: 'dd/MM/yyyy',
    })} y modificar los registros?`;
    const ok = confirm(message);
    if (ok) {
      registrarLibroDiario({ Fecha });
    }
  }

  const renderTable = <>
    {libroDiario &&
      libroDiario?.map((libro, idx) =>
        <AsientoLibroDiario
          key={libro.Numero}
          libro={libro}
          nroAsiento={idx + 1}
          user={user}
        />)}
    {Fecha &&
      <TotalDebeHaberDiv>
        <ListItem title="Total debe" description={TotalDebe} />
        <ListItem title="Total haber" description={TotalHaber} />
      </TotalDebeHaberDiv>
    }
  </>

  return (
    <Layout title='Libro diario' user={user}>
      <Contabilidad />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        buttonLabel="Mostrar libro diario"
        buttonStyles={{ marginTop: '1rem' }}
        config={LibroDiarioForm}
        defaultValues={{ Fecha }}
        formStyle={{ justifyContent: 'center' }}
        onFormSubmit={onSubmit}
      />
      {showButton && <Button label="Registrar libro diario" onClick={registerLibroDiario} style={{ marginBottom: '1rem' }} />}
      {Fecha &&
        <>
          {PrintButton}
          <BalanceDiv ref={ref} >
            <Heading level={1}>Libro diario</Heading>
            <DesdeHastaDiv>
              <ListItem title="Hasta fecha" description={Fecha && format(Fecha)} />
            </DesdeHastaDiv>
            {loading ? <h3>Cargando...</h3> : renderTable}
          </BalanceDiv>
        </>
      }

    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default LibroDiario;

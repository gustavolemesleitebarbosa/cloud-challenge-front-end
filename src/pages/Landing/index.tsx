import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Modal from 'react-modal';
import Grid from '../../components/grid';
import { Content, GridsContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import api from '../../services/api';

interface SkyFormData {
  numberOfAirports: number;
  numberOfRows: number;
  numberOfColumns: number;
  numberOfClouds: number;
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(220, 220, 220, 0.8)',
  },
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: '#000',
    transform: 'translate(-50%, -50%)',
  },
};

const Landing: React.FC = () => {
  const [daysToFirstHit, setDaysToFirstHit] = useState<
    number | undefined
  >(undefined);
  const [daysToAllHits, setDaysToAllHits] = useState<
    number | undefined
  >(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [skyHistory, setSkyHistory] =useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [numberOfAirports, setNumberOfAirports] = useState<number>(3);
  const [numberOfRows, setNumberOfRows] = useState(10);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(10);
  const [numberOfClouds, setNumberOfClouds] = useState<number>(4);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const maximumNumberOfAirports = (numberOfColumns*numberOfRows) -4
    const randomNumberOfAirports= Math.floor(Math.random() * maximumNumberOfAirports) + 3
    setNumberOfAirports(randomNumberOfAirports)
    const maximumNumberOfClouds = (numberOfColumns*numberOfRows) -randomNumberOfAirports;
    const randomNumberOfClouds= Math.floor(Math.random() * maximumNumberOfClouds) + 4
    setNumberOfClouds(randomNumberOfClouds)
    Math.floor(Math.random() * (numberOfColumns * numberOfRows) + 1);
  }, [numberOfColumns,numberOfRows])

  const handleSubmit = useCallback(async (data: SkyFormData) => {
    try {
      const schema = Yup.object().shape({
        numberOfAirports: Yup.number()
          .required(`Qual é o número de aeroportos`)
          .min(3, `Ao menos três aeroportos são necessárias`),
        numberOfClouds: Yup.number()
          .required(`Qual é o número de nuvens`)
          .min(3, `Ao menos quatro nuvens são necessárias`),
        numberOfRows: Yup.number()
          .required(`Qual é o número de linhas`)
          .min(10, `Ao menos dez linhas são necessárias`),
        numberOfColumns: Yup.number()
          .required(`Qual é o número de colunas`)
          .min(10, `Ao menos dez colunas são necessárias`),
      });
      await schema.validate(data, { abortEarly: false });
      const customData= JSON.stringify({
        'numberOfAirports': numberOfAirports,
        'numberOfClouds': numberOfClouds,
        'numberOfRows': numberOfRows,
        'numberOfColumns': numberOfColumns,
      })

      const options = {
        headers: { custom: customData }
      };
      const response  = await api.get('/',options);
      const {daysToAllHits,daysToFirstHit, history} = response.data;
      setDaysToFirstHit(daysToFirstHit);
      setDaysToAllHits(daysToAllHits);
      setSkyHistory(history);

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setIsOpen(true);
        const errors = getValidationErrors(err);
        setErrorMessage(err.message);
      }
    }
  }, [numberOfRows,numberOfColumns, numberOfAirports, numberOfClouds]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Content id="main">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <button type="button" onClick={handleCloseModal}>
          {` \t x \t `}
        </button>
        <h2> Erro ao tentar submeter o formulário: </h2>
        <h2>{errorMessage}</h2>
      </Modal>

      <div>
        <Form ref={formRef} onSubmit={data => handleSubmit(data)}>
          <div>
            <h4>Número de aeroportos:</h4>
            <Input
              name="numberOfAirports"
              type="number"
              required
              value={numberOfAirports}
              onChange={e => setNumberOfAirports(parseInt(e.target.value))}
            />
          </div>
          <div>
            <h4>Número de nuvens:</h4>
            <Input
              name="numberOfClouds"
              type="number"
              required
              value={numberOfClouds}
              onChange={e => setNumberOfClouds(parseInt(e.target.value))}
            />
          </div>
          <div>
            <h4>Número de linhas:</h4>
            <Input
              name="numberOfRows"
              type="number"
              required
              value={numberOfRows}
              onChange={e => setNumberOfRows(parseInt(e.target.value))}
            />
          </div>
          <div>
            <h4>Número de colunas:</h4>
            <Input
              name="numberOfColumns"
              type="number"
              required
              value={numberOfColumns}
              onChange={e => setNumberOfColumns(parseInt(e.target.value))}
            />
          </div>
          <input type="submit" value="submeter dados" />
        </Form>
      </div>
      {daysToFirstHit && (
        <h2>{`Dias para atingir o primeiro aeroporto: ${daysToFirstHit}`}</h2>
      )}
      {daysToAllHits && (
        <h2>{`Dias para atingir todoso os aeroportos: ${daysToAllHits}`}</h2>
      )}
      <GridsContainer>
     {skyHistory.length>0 && skyHistory.map((skyInfo, index)=><>
      <div>
      <h3>{index=== 0?`Dia ${index} (hoje)`:`Dia ${index}`}</h3>
      <Grid numberOfColumns={numberOfColumns} skyInfo={skyInfo} />
      </div>
     </>)}
     </GridsContainer>
    </Content>
  );
};
export default Landing;

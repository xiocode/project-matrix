import { Select } from 'antd';
import { memo, PropsWithChildren, useEffect, useState } from 'react';
import rapidApi from '~/rapidApi';

type IProps = PropsWithChildren<{
  value?: string;
  onChange?(v: string): void;
}>;

const ModelSelector = memo<IProps>((props) => {
  const { loadModels, loading, models } = useModels();

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <Select placeholder="请选择" loading={loading} value={props.value} onChange={props.onChange}>
      {models?.map((m) => (
        <Select.Option key={m.id}>{m.name}</Select.Option>
      ))}
    </Select>
  );
});

export default ModelSelector;

function useModels() {
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<any[]>([]);

  const loadModels = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    await rapidApi
      .post(`/shopfloor/models/operations/find`, {
        data: {
          pagination: {
            limit: 10000,
            offset: 0,
          },
        },
      })
      .then((res) => {
        // TODO
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, loadModels, models };
}

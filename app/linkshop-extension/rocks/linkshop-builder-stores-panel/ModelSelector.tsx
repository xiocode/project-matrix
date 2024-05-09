import { Select } from "antd";
import { camelCase, upperFirst } from "lodash";
import { memo, PropsWithChildren, useEffect, useMemo, useState } from "react";
import rapidApi from "~/rapidApi";

type IProps = PropsWithChildren<{
  value?: string;
  onChange?(v: string): void;
}>;

const ModelSelector = memo<IProps>((props) => {
  const { loadModels, loading, models } = useModels();

  useEffect(() => {
    loadModels();
  }, []);

  const options = useMemo(() => (models || []).map((m) => ({ label: m.name, value: upperFirst(camelCase(m.singularCode)) })), [models]);

  return <Select placeholder="请选择" loading={loading} options={options} value={props.value} onChange={props.onChange} />;
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
      .post(`/meta/models/operations/find`, {
        pagination: {
          limit: 10000,
          offset: 0,
        },
      })
      .then((res) => {
        setModels(res.data?.list || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, loadModels, models };
}

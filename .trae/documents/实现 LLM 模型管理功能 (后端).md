我已根据您的要求更新了计划，增加了 `llm_model` 表的独立 CRUD 操作，并详细规划了各层代码结构。

1. **定义数据模型** (`apps/server/src/models/llm.model.ts`):

   * **LLMProvider (DTO)**:

     * 字段：`name` (必填), `type` (必填), `baseURL` (必填), `apiKey` (必填), `proxy` (选填)。

   * **LLMModel (DTO)**:

     * 字段：`providerId` (必填，关联提供商), `modelId` (必填，模型标识), `ability` (必填数组), `temperature` (默认 0.85), `topP` (默认 0.95), `stream` (默认 true), `custom` (选填 JSON)。

2. **实现服务层** (`apps/server/src/services/llm.service.ts`):

   * **Provider Service (针对** **`llm_provider`** **表)**:

     * `createProvider(db, userId, data)`: 创建提供商，绑定 userId。

     * `getProvidersByUser(db, userId)`: 获取用户的所有提供商。

     * `updateProvider(db, id, userId, data)`: 校验归属权并更新。

     * `deleteProvider(db, id, userId)`: 删除提供商（同时删除关联的 models）。

   * **Model Service (针对** **`llm_model`** **表)**:

     * `createModel(db, userId, data)`: 校验 `providerId` 是否属于该用户，创建模型记录。

     * `getModelsByProvider(db, providerId)`: 获取指定提供商下的所有模型。

     * `updateModel(db, id, userId, data)`: 校验归属权并更新模型。

     * `deleteModel(db, id, userId)`: 删除模型。

3. **实现控制层** (`apps/server/src/controllers/llm.controller.ts`):

   * 路由前缀 `/llm`，全链路应用 `authPlugin`。

   * **Provider 接口**:

     * `POST /providers`: 新增提供商。

     * `GET /providers`: 获取提供商列表。

     * `PUT /providers/:id`: 更新提供商。

     * `DELETE /providers/:id`: 删除提供商。

   * **Model 接口**:

     * `POST /models`: 新增模型 (Body 中包含 `providerId`)。

     * `GET /models?providerId=...`: 获取模型列表。

     * `PUT /models/:id`: 更新模型。

     * `DELETE /models/:id`: 删除模型。

4. **注册与集成** (`apps/server/src/index.ts`):

   * 注册 `llmController` 到主应用。


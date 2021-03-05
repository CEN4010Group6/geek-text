export interface Resource {
  /**
   * Get requet to find all records in a table
   *
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   * @param select
   */
  findAll(
    skip?: number,
    take?: number,
    cursor?: any,
    where?: any,
    orderBy?: any,
    select?: any
  ): Promise<any>;

  /**
   * GET request to find a single record in a table
   *
   * @param id
   * @param select
   */
  findOne(
    id: string | number,
    select?: any
  ): Promise<any | null>;

  /**
   * POST request to create a record in a table
   *
   * @param postData
   */
  create(
    postData: any
  ): Promise<any>;

  /**
   * PUT request to update a record in a table
   *
   * @param id
   * @param postData
   */
  update(
    id: string | number,
    postData: any
  ): Promise<any>;

  /**
   * DELETE request to delete a record in a table
   *
   * @param id
   */
  delete(
    id: string | number
  ): Promise<any>
}

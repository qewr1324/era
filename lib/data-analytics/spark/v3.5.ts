export function generate(params: any): string {
	return `spark.master                    spark://master:7077
spark.app.name                  MySparkApp
spark.driver.memory             2g
spark.executor.memory            4g
spark.executor.cores             2
spark.executor.instances         4
spark.sql.adaptive.enabled       true
spark.sql.adaptive.coalescePartitions.enabled  true
spark.serializer                 org.apache.spark.serializer.KryoSerializer
spark.sql.catalogImplementation  hive

spark.eventLog.enabled           true
spark.eventLog.dir               hdfs://namenode:8020/spark-logs

spark.history.fs.logDirectory    hdfs://namenode:8020/spark-logs`;
}
